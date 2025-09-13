import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

// You can read data from the database via a query:
export const workspaceItems = query({

  handler: async (ctx) => {
    //// Read the database as many times as you need here.
    //// See https://docs.convex.dev/database/reading-data.
    
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("User not authenticated");
    }
    const userId = user.tokenIdentifier.split("|")[1];
    const workspaceItems = await ctx.db
      .query("workspace_list")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .collect();
    return {
      workspaceItems: workspaceItems,
    };
  },
});

export const createWorkspace = mutation({

  args: {
    workspaceName: v.string(),
  },

  handler: async (ctx, args) => {
    //// Read the database as many times as you need here.
    //// See https://docs.convex.dev/database/reading-data.
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("User not authenticated");
    }
    const userId = user.tokenIdentifier.split("|")[1];
    const workspaceId = await ctx.db.insert("workspace_list", {
      workspacename: args.workspaceName,
      userId: userId,
    });
    return workspaceId;
  },
});