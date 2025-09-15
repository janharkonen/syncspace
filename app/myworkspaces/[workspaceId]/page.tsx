"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import Workspace from "@/components/workspace/workspace";

export default function Home() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const workspaceIdType = workspaceId as Id<"workspace_list">;
  const { workspaceEntries, workspaceName } = useQuery(
    api.workspaceFunctions.workspaceEntriesOwn, 
    { workspaceId: workspaceIdType }) 
    ?? 
    { workspaceEntries: [], workspaceName: "" };
  return (
    <Workspace workspaceName={workspaceName ?? ""} workspaceEntries={workspaceEntries} />
  );
}
