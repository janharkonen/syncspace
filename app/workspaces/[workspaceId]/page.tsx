"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

export default function Home() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const workspaceIdType = workspaceId as Id<"workspace_list">;
  const { workspaceEntries, workspaceName } = useQuery(
    api.workspaceFunctions.workspaceEntries, 
    { workspaceId: workspaceIdType }) 
    ?? 
    { workspaceEntries: [], workspaceName: "" };
  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto">
        <h1>{workspaceName}</h1>
        {workspaceEntries.map((workspaceEntry) => (
          <div key={workspaceEntry._id}>
            <h2>{workspaceEntry.caption}</h2>
          </div>
        ))}
    </div>
  );
}
