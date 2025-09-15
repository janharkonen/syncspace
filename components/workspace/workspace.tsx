import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Workspace({
    workspaceName, workspaceEntries}: 
    { workspaceName: string, workspaceEntries: any[]}) {
  
    return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto">
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">{workspaceName}</CardTitle>
            </CardHeader>
            <CardContent>
                {workspaceEntries.map((workspaceEntry) => (
                    <div className="flex flex-row items-center justify-start gap-2" key={workspaceEntry._id}>
                        <WorkspaceEntry workspaceEntry={workspaceEntry} />
                    </div>

                ))}
            </CardContent>
        </Card>
    </div>
  );
}

function WorkspaceEntry({ workspaceEntry }: { workspaceEntry: any }) {
    const updateWorkspaceEntryChecked = useMutation(api.workspaceFunctions.updateWorkspaceEntryChecked);
    return (
        <>  
            <Checkbox 
            key={`${workspaceEntry._id}-key`} 
            id={`${workspaceEntry._id}-id`} 
            onClick={() => {
                updateWorkspaceEntryChecked({
                    workspaceEntryId: workspaceEntry._id,
                    checked: !workspaceEntry.checked,
                });
            }}
            checked={workspaceEntry.checked} 
            />
            <h2 className="text-lg">{workspaceEntry.caption}</h2>
        </>
    );
}