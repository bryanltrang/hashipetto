import { v } from 'convex/values';
import { mutation } from '../_generated/server';

export const createPet = mutation({
  args: {
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    userId: v.id('users'),
    // petTypeId is used to get the default pet name
    petTypeId: v.id('petTypes'),
    // evolution stage is used to get the default description and max health points
    evolutionStage: v.union(
      v.literal('egg'),
      v.literal('first'),
      v.literal('second'),
      v.literal('third'),
    ),
    defaultLevel: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const {
      name,
      description,
      userId,
      petTypeId,
      evolutionStage,
      defaultLevel,
    } = args;
    //query for pet type data to get the default name
    const petTypeData = await ctx.db.get(petTypeId);
    if (!petTypeData) {
      console.error('There was an issue getting pet type data');
      return null;
    }
    const { petTypeName } = petTypeData;
    //query for evolution stage data to get the default description and max health points
    const evolutionStageData = await ctx.db
      .query('evolutions')
      .filter(
        (q) =>
          q.eq(q.field('evolutionStage'), evolutionStage) &&
          q.eq(q.field('petTypeId'), petTypeId),
      )
      .first();
    if (!evolutionStageData) {
      console.error('There was an issue getting evolution stage data');
      return null;
    }
    const { maxHealthPoints, description: defaultDescription } =
      evolutionStageData;
    try {
      const newPetId = await ctx.db.insert('pets', {
        defaultName: petTypeName,
        name: name || petTypeName,
        description: description || defaultDescription,
        experiencePoints: 0,
        level: defaultLevel || 1,
        evolutionStage,
        healthPoints: maxHealthPoints,
        userId,
        petTypeId,
        lastInteraction: new Date().toISOString(),
        totalDistanceKM: 0,
        totalDurationMinutes: 0,
        needsRecovery: false,
      });
      return newPetId;
    } catch (err) {
      console.error('There was an issue creating a new pet:', err);
      return null;
    }
  },
});

export const updatePetById = mutation({
  args: {
    petId: v.id('pets'),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    experiencePoints: v.optional(v.number()),
    level: v.optional(v.number()),
    evolutionStage: v.optional(
      v.union(
        v.literal('egg'),
        v.literal('first'),
        v.literal('second'),
        v.literal('third'),
      ),
    ),
    healthPoints: v.optional(v.number()),
    lastInteraction: v.optional(v.string()),
    totalDistanceKM: v.optional(v.number()),
    totalDurationMinutes: v.optional(v.number()),
    needsRecovery: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    try {
      const { petId, ...rest } = args;
      const updatedPetId = await ctx.db.patch(petId, { ...rest });
      return updatedPetId;
    } catch (err) {
      console.error('There was an issue updating the pet:', err);
      return null;
    }
  },
});
