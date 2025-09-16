import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from 'react'

export default function Workspace({
    workspaceName, workspaceEntries}: 
    { workspaceName: string, workspaceEntries: {
        _id: Id<"workspace_entries">;
        _creationTime: number;
        caption: string;
        checked: boolean;
        workspaceId: Id<"workspace_list">;
    }[] }) {
  
    return (
    <div className="sm:mt-4 flex flex-col gap-8 max-w-3xl mx-auto">
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

function WorkspaceEntry({ workspaceEntry }: { workspaceEntry:  {
    _id: Id<"workspace_entries">;
    _creationTime: number;
    caption: string;
    checked: boolean;
    workspaceId: Id<"workspace_list">;
}}) {
    const updateWorkspaceEntry = useMutation(api.workspaceFunctions.updateWorkspaceEntry);
    const [caption, setCaption] = useState(workspaceEntry.caption)
    useEffect(() => {
        setCaption(workspaceEntry.caption);
    }, [workspaceEntry.caption]);
    return (
        <>  
            <Checkbox 
            key={`${workspaceEntry._id}-key`} 
            id={`${workspaceEntry._id}-id`} 
            onMouseDown={() => {
                updateWorkspaceEntry({
                    workspaceEntryId: workspaceEntry._id,
                    checked: !workspaceEntry.checked,
                });
            }}
            checked={workspaceEntry.checked} 
            />
            <Input className="text-lg " value={caption} onChange={(e) => {
                setCaption(e.target.value);
            }}
            onBlur={() => {
                updateWorkspaceEntry({
                    workspaceEntryId: workspaceEntry._id,
                    caption: caption,
                });
            }} />
        </>
    );
}