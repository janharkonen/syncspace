"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import Workspace from "@/components/workspace/workspace";
import { Button } from "@/components/ui/button";
import { Lock, Globe, ArrowLeft } from "lucide-react";
import Sidebar from "@/components/sidebar/Sidebar";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useRouter } from "next/navigation";

export default function Home() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const workspaceIdType = workspaceId as Id<"workspace_list">;
  
  const { workspaceEntries, workspaceName, workspaceStatus } = useQuery(
    api.workspaceFunctions.workspaceEntriesOwn, 
    { workspaceId: workspaceIdType }) 
    ?? 
    { workspaceEntries: [], workspaceName: "", workspaceStatus: "" };
  
  const updateWorkspace = useMutation(api.workspaceFunctions.updateWorkspace);
  const router = useRouter();
  return (
  <>
      {/* Desktop view */}
      <div className="flex flex-row h-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel className="hidden sm:block" defaultSize={16}>
            <Sidebar className="flex-none w-full"/>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <div className="flex-grow overflow-y-auto h-full">
              <div className="flex flex-col">
                <Button 
                variant="default" 
                className="sm:hidden m-4"
                onClick={() => { 
                  router.push(`/myworkspaces`);
                }}
                >
                  <ArrowLeft /> Back to workspaces
                </Button>
                <Button 
                variant="publicprivatetoggle" 
                className="m-4 w-12 h-12"
                onClick={() => {
                  updateWorkspace({ workspaceId: workspaceIdType, status: workspaceStatus === "public" ? "private" : "public" });
                }}>
                  {workspaceStatus === "public" ? <Globe /> : <Lock />}
                </Button>
              </div>
              <Workspace workspaceName={workspaceName ?? ""} workspaceEntries={workspaceEntries ?? []} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
  </>
  );
}
