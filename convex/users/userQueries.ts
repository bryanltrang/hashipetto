import { v } from 'convex/values';
import { query } from '../_generated/server';

export const getUserByClerkUserId = query({
  args: {
    clerkUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = args;
    try {
      const user = await ctx.db
        .query('users')
        .filter((q) => q.eq(q.field('clerkUserId'), clerkUserId));
      return user;
    } catch (err) {
      console.error('There was an issue getting the user information:', err);
      return null;
    }
  },
});
