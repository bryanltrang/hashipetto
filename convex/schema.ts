import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const users = {
  users: defineTable({
    profileImageUrl: v.string(),
    activePetId: v.optional(v.id('pets')),
    clerkUserId: v.string(),
  }).index('pets', ['activePetId']),
};

export const pets = {
  pets: defineTable({
    defaultName: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    experiencePoints: v.number(),
    level: v.number(),
    evolutionStage: v.union(
      v.literal('egg'),
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
  })
    .index('users', ['userId'])
    .index('petTypes', ['petTypeId']),
};

const petStatLog = {
  petStatLog: defineTable({
    experiencePoints: v.number(),
    level: v.number(),
    petId: v.id('pets'),
  }).index('pets', ['petId']),
};

const runLog = {
  runLog: defineTable({
    durationMinutes: v.number(),
    distanceKM: v.number(),
    petStatLogId: v.id('petStatLog'),
    runDate: v.string(),
    caloriesBurned: v.number(),
    userId: v.id('users'),
  })
    .index('petStatLog', ['petStatLogId'])
    .index('users', ['userId']),
};

const petTypes = {
  petTypes: defineTable({
    petTypeName: v.string(),
    levelingDifficulty: v.number(),
  }),
};

const evolutions = {
  evolutions: defineTable({
    evolutionStage: v.union(
      v.literal('egg'),
      v.literal('first'),
      v.literal('second'),
      v.literal('third'),
    ),
    evolutionImgUrl: v.string(),
    requiredLevel: v.number(),
    maxHealthPoints: v.number(),
    requiredExperiencePoints: v.number(),
    petTypeId: v.id('petTypes'),
    description: v.optional(v.string()),
    isFinalEvolution: v.boolean(),
    requiredHatchDistance: v.optional(v.number()),
    requiredRecoveryDistance: v.optional(v.number()),
  }).index('petTypes', ['petTypeId']),
};

export default defineSchema({
  ...users,
  ...pets,
  ...petTypes,
  ...evolutions,
  ...petStatLog,
  ...runLog,
});
