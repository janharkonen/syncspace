import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
    
    // Double check that the workspace exists AND that the user is the owner
    const userId = user.tokenIdentifier.split("|")[1];
    const workspaceItems = await ctx.db
      .query("workspace_list")
      .filter((q) => q.eq(q.field("_id"), args.workspaceId))
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    if (workspaceItems.length === 0) {
      throw new Error("Workspace not found or not owned by user");
    }

    const workspaceEntries = await ctx.db
      .query("workspace_entries")
      .filter((q) => q.eq(q.field("workspaceId"), args.workspaceId))
      .order("desc")
      .collect();
    
    const workspaceName : string = workspaceItems[0].workspacename;
    const workspaceStatus : string = workspaceItems[0].status;
    return {
      workspaceEntries: workspaceEntries,
      workspaceName: workspaceName,
      workspaceStatus: workspaceStatus,
    };
  },
});
export const workspaceEntriesPublic = query({
  // Get the workspace entries and check that the user is the owner of the workspace
  args: {
    workspaceId: v.id("workspace_list"),
  },

  handler: async (ctx, args) => {
    
    // Double check that the workspace exists and isn't duplicated and that it is indeed public
    const workspaceItems = await ctx.db
      .query("workspace_list")
      .filter((q) => q.eq(q.field("_id"), args.workspaceId))
      .collect();

    if (workspaceItems[0].status !== "public") {
      return {
        workspaceEntries: [],
        workspaceName: "",
      };
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
export const updateWorkspaceEntry = mutation({

  args: {
    workspaceEntryId: v.id("workspace_entries"),
    checked: v.optional(v.boolean()),
    caption: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.workspaceEntryId, {
      ...(args.checked !== undefined ? { checked: args.checked } : {}),
      ...(args.caption !== undefined ? { caption: args.caption } : {}),
    });
  },
});
export const createWorkspaceEntry = mutation({

  args: {
    workspaceId: v.id("workspace_list"),
  },

  handler: async (ctx, args) => {
    await ctx.db.insert("workspace_entries", {
      caption: "",
      checked: false,
      workspaceId: args.workspaceId,
    });
  },
});
export const deleteWorkspaceEntry = mutation({

  args: {
    workspaceEntryId: v.id("workspace_entries"),
  },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.workspaceEntryId);
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
export const updateWorkspace = mutation({
  args: {
    workspaceId: v.id("workspace_list"),
    status: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.workspaceId, { status: args.status });
  },
})