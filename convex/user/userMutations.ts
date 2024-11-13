import { v } from 'convex/values';
import { mutation } from '../_generated/server';

export const createUser = mutation({
  args: {
    activePet: v.id('pets'),
    profileImageUrl: v.string(),
    clerkUserId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const newUserId = await ctx.db.insert('users', {
        activePet: args.activePet,
        profileImageUrl: args.profileImageUrl,
        clerkUserId: args.clerkUserId,
      });
      return newUserId;
    } catch (err) {
      console.error('There was an issue creating a new user:', err);
      return null;
    }
  },
});

export const updateUserById = mutation({
  args: {
    userId: v.id('users'),
    changedValues: v.object({
      activePet: v.optional(v.id('pets')),
      profileImageUrl: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const { userId, changedValues } = args;
    try {
      const updatedUser = await ctx.db.patch(userId, { ...changedValues });
      return updatedUser;
    } catch (err) {
      console.error('There was an issue updating the user:', err);
      return null;
    }
  },
});

export const deleteUserById = mutation({
  args: {
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    try {
      const deletedUserId = await ctx.db.delete(args.userId);
      return deletedUserId;
    } catch (err) {
      console.error('There was an issue deleting the user:', err);
      return null;
    }
  },
});
