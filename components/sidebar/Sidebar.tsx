import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter, useParams } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Lock, Globe } from "lucide-react";

export default function Sidebar({className}: {className: string}) {
  const { workspaceItems } = useQuery(api.workspaceFunctions.workspaceItems) ?? { workspaceItems: [] };
  const router = useRouter();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  return (
    <>
    <div className={cn("text-white h-full sidebar bg-[var(--header-background)] overflow-y-auto border-r-1 border-header-border", className)}>
        <DialogCloseButton />
        {workspaceItems.map((workspaceItem) => (
            <Button
            key={workspaceItem._id}
                className="
                    w-full 
                    cursor-pointer 
                    overflow-hidden 
                    text-ellipsis 
                    whitespace-nowrap
                    text-left
                    justify-between

                "
                variant={workspaceId === workspaceItem._id ? "sidebarbuttonactive" : "sidebarbutton"}
                onClick={() => { 
                    router.push(`/myworkspaces/${workspaceItem._id}`);
                }}
                
                >
                <span title={workspaceItem.workspacename} className="text-sm">{workspaceItem.workspacename}</span>
              {workspaceItem.status === "private" && <div title="Private"><Lock /></div>}
              {workspaceItem.status === "public" && <div title="Public"><Globe /></div>}
            </Button>
        ))}
    </div>
    </>
  )
}

function DialogCloseButton( ) {
    const [workspaceName, setWorkspaceName] = useState("");
    const createWorkspace = useMutation(api.workspaceFunctions.createWorkspace);
    const router = useRouter();
    return (
      <Dialog>
        <DialogTrigger asChild>
            <div className="p-2">
              <Button className="w-full hover:cursor-pointer">+ Add workspace</Button>
            </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New workspace</DialogTitle>
            <DialogDescription>
              Give a name to your new workspace.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                onChange={(e) => {
                  setWorkspaceName(e.target.value);
                }}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="hover:cursor-pointer"
              onClick={() => {
                const workspaceId = createWorkspace({ workspaceName: workspaceName });
                workspaceId.then((workspaceId) => {
                    if (workspaceId) {
                     router.push(`/workspaces/${workspaceId}`);
                    }
                });
              }}
              >
                OK
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }