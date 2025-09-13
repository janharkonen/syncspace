import { v } from "convex/values";
import { query } from "./_generated/server";

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

// You can read data from the database via a query:
export const workspaceItems = query({

  handler: async (ctx) => {
    //// Read the database as many times as you need here.
    //// See https://docs.convex.dev/database/reading-data.
    
    const user = await ctx.auth.getUserIdentity();
    console.log(user);
    const workspaceEntries = await ctx.db
      .query("workspace_list")
      .order("desc")
      .collect();
    return {
      workspaceEntries: workspaceEntries,
    };
  },
});
