import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useQuery,
} from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter, useParams } from "next/navigation";

export default function Sidebar({className}: {className: string}) {
  const { workspaceEntries } = useQuery(api.workspaceFunctions.workspaceItems) ?? { workspaceEntries: [] };
  const router = useRouter();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  return (
    <>
    <div className={cn("text-white h-full sidebar bg-[var(--header-background)] overflow-y-auto border-r-1 border-header-border", className)}>
        <div>
            <div>
                {workspaceEntries.map((workspaceEntry) => (
                    <Button
                    key={workspaceEntry._id}
                        className="
                            w-full 
                            cursor-pointer 
                            overflow-hidden 
                            text-ellipsis 
                            whitespace-nowrap
                            text-left
                            justify-start
                        "
                        variant={workspaceId === workspaceEntry._id ? "sidebarbuttonactive" : "sidebarbutton"}
                        onClick={() => { 
                            router.push(`/workspaces/${workspaceEntry._id}`);
                        }}
                        title={workspaceEntry.workspacename}
                        >
                        {workspaceEntry.workspacename}
                    </Button>
                ))}
            </div>
        </div>
    </div>
    </>
  )
}