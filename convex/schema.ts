import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  workspace_entries: defineTable({
    caption: v.string(),
    checked: v.boolean(),
    workspaceId: v.id("workspace_list"),
  }),

  workspace_list: defineTable({
    status: v.string(),
    userId: v.string(),
    workspacename: v.string(),
  }),
});