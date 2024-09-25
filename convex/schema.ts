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



export default defineSchema({
  ...userSchema,
  ...petSchema,
});