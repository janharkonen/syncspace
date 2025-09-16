"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import Workspace from "@/components/workspace/workspace";
import { Button } from "@/components/ui/button";
import { Lock, Globe } from "lucide-react";

export default function Home() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const workspaceIdType = workspaceId as Id<"workspace_list">;
  
  const { workspaceEntries, workspaceName, workspaceStatus } = useQuery(
    api.workspaceFunctions.workspaceEntriesOwn, 
    { workspaceId: workspaceIdType }) 
    ?? 
    { workspaceEntries: [], workspaceName: "", workspaceStatus: "" };
  
  const updateWorkspace = useMutation(api.workspaceFunctions.updateWorkspace);
  return (
    <>
      <Button 
      variant="publicprivatetoggle" 
      className="m-4 w-12 h-12"
      onClick={() => {
        updateWorkspace({ workspaceId: workspaceIdType, status: workspaceStatus === "public" ? "private" : "public" });
      }}>
        {workspaceStatus === "public" ? <Globe /> : <Lock />}
      </Button>
      <Workspace workspaceName={workspaceName ?? ""} workspaceEntries={workspaceEntries ?? []} />
    </>
  );
}
