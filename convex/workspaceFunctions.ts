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

export const workspaceEntriesOwn = query({
  // Get the workspace entries and check that the user is the owner of the workspace
  args: {
    workspaceId: v.id("workspace_list"),
  },

  handler: async (ctx, args) => {
    
    // Doublecheck if user is authenticated    
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("User not authenticated");
    }
    
    // Double check that the workspace exists and isn't duplicated AND that the user is the owner
    const userId = user.tokenIdentifier.split("|")[1];
    const workspaceItems = await ctx.db
      .query("workspace_list")
      .filter((q) => q.eq(q.field("_id"), args.workspaceId))
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();
    
    if (workspaceItems.length === 0) {
      return {
        workspaceEntries: [],
      }
    }

    if (workspaceItems.length > 1) {
      throw new Error("Multiple workspace items found");
    }

    const workspaceEntries = await ctx.db
      .query("workspace_entries")
      .filter((q) => q.eq(q.field("workspaceId"), args.workspaceId))
      .order("desc")
      .collect();
    
    const workspaceName : string = workspaceItems[0].workspacename;
    return {
      workspaceEntries: workspaceEntries,
      workspaceName: workspaceName,
    };
  },
});

export const updateWorkspaceEntryChecked = mutation({

  args: {
    workspaceEntryId: v.id("workspace_entries"),
    checked: v.boolean(),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.workspaceEntryId, {
      checked: args.checked,
    });
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
      status: "private",
    });
    return workspaceId;
  },
});