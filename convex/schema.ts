import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const userSchema = {
  user: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    password: v.string(),
    profileImageUrl: v.string(),
    activePet: v.id('pet'),
  })
}

const petSchema = {
  pet: defineTable({
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
    userId: v.id('user'),
    petTypeId: v.id('pet_type'),
    lastInteraction: v.string(),
    totalDistanceKM: v.number(),
    totalDurationMinutes: v.number(),
  })
}

const petStatLog = {
  petStatLog: defineTable({
    experiencePoints: v.number(),
    level: v.number(),
    petId: v.id('pet'),
  })
}

const runLog = {
  runLog: defineTable({
    durationMinutes: v.number(),
    distanceKM: v.number(),
    petStatLogId: v.id('pet_stat_log'),
    runDate: v.string(),
    caloriesBurned: v.number(),
    userId: v.id('user'),
  })
}

const petTypeSchema = {
  petType: defineTable({
    petTypeName: v.string(),
    levelingDifficulty: v.number(),
  })
}

const evolution = {
  evolution: defineTable({
    evolutionStage: v.string(),
    evolutionImgUrl: v.string(),
    requiredLevel: v.number(),
    maxHealthPoints: v.number(),
    requiredExperiencePoints: v.number(),
    petId: v.id('pet'),
    description: v.optional(v.string()),
    isFinalEvolution: v.boolean(),
    isEgg: v.boolean(),
    requiredHatchDistance: v.optional(v.number()),
  })
}


export default defineSchema({
  ...userSchema,
  ...petSchema,
  ...petTypeSchema,
  ...evolution,
  ...petStatLog,
  ...runLog,
});