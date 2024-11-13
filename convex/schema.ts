import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const users = {
  users: defineTable({
    profileImageUrl: v.string(),
    activePet: v.id('pets'),
    clerkUserId: v.string(),
  }),
};

const pets = {
  pets: defineTable({
    defaultName: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    experiencePoints: v.number(),
    level: v.number(),
    evolutionStage: v.union(
      v.literal('first'),
      v.literal('second'),
      v.literal('third'),
    ),
    healthPoints: v.number(),
    userId: v.id('users'),
    petTypeId: v.id('petTypes'),
    lastInteraction: v.string(),
    totalDistanceKM: v.number(),
    totalDurationMinutes: v.number(),
    needsRecovery: v.boolean(),
  }),
};

const petStatLog = {
  petStatLog: defineTable({
    experiencePoints: v.number(),
    level: v.number(),
    petId: v.id('pets'),
  }),
};

const runLog = {
  runLog: defineTable({
    durationMinutes: v.number(),
    distanceKM: v.number(),
    petStatLogId: v.id('petStatLog'),
    runDate: v.string(),
    caloriesBurned: v.number(),
    userId: v.id('users'),
  }),
};

const petTypes = {
  petTypes: defineTable({
    petTypeName: v.string(),
    levelingDifficulty: v.number(),
  }),
};

const evolutions = {
  evolutions: defineTable({
    evolutionStage: v.string(),
    evolutionImgUrl: v.string(),
    requiredLevel: v.number(),
    maxHealthPoints: v.number(),
    requiredExperiencePoints: v.number(),
    petId: v.id('pets'),
    description: v.optional(v.string()),
    isFinalEvolution: v.boolean(),
    isEgg: v.boolean(),
    requiredHatchDistance: v.optional(v.number()),
    requiredRecoveryDistance: v.optional(v.number()),
  }),
};

export default defineSchema({
  ...users,
  ...pets,
  ...petTypes,
  ...evolutions,
  ...petStatLog,
  ...runLog,
});
