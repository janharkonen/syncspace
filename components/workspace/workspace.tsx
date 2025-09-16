import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";

export default function Workspace({
    workspaceName, workspaceEntries}: 
    { workspaceName: string, 
      workspaceEntries: {
        _id: Id<"workspace_entries">;
        _creationTime: number;
        caption: string;
        checked: boolean;
    }[] },) {
       
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const workspaceIdType = workspaceId as Id<"workspace_list">;
    const createWorkspaceEntry = useMutation(api.workspaceFunctions.createWorkspaceEntry);
    const checkedItems = workspaceEntries.filter((workspaceEntry) => workspaceEntry.checked).length;
    return (
    <div className="sm:mt-4 flex flex-col gap-8 max-w-3xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">{workspaceName}</CardTitle>
                <CardDescription>{checkedItems} / {workspaceEntries.length} done</CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="outline" className="mb-4" onClick={() => {
                    createWorkspaceEntry({ workspaceId: workspaceIdType });
                }}>+ Add Item</Button>
                {workspaceEntries.map((workspaceEntry) => (
                    <div className="flex flex-row items-center justify-start gap-2 m-2" key={workspaceEntry._id}>
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
}}) {
    const updateWorkspaceEntry = useMutation(api.workspaceFunctions.updateWorkspaceEntry);
    const deleteWorkspaceEntry = useMutation(api.workspaceFunctions.deleteWorkspaceEntry);
    const [caption, setCaption] = useState(workspaceEntry.caption)
    const [checked, setChecked] = useState(workspaceEntry.checked)
    useEffect(() => {
        setCaption(workspaceEntry.caption);
    }, [workspaceEntry.caption]);
    useEffect(() => {
        setChecked(workspaceEntry.checked);
    }, [workspaceEntry.checked]);
    return (
        <>  
            <Checkbox 
            key={`${workspaceEntry._id}-key`} 
            id={`${workspaceEntry._id}-id`} 
            className="size-8 hover:cursor-pointer bg-secondary dark:bg-secondary" 
            onMouseDown={() => {
                setChecked(!checked);
                updateWorkspaceEntry({
                    workspaceEntryId: workspaceEntry._id,
                    checked: !checked,
                });
            }}
            checked={checked}
            />
            <Input 
                className={`text-lg bg-secondary dark:bg-secondary ${checked ? "line-through text-gray-400" : ""}`} 
                value={caption} 
                onChange={(e) => {
                    setCaption(e.target.value);
                }}
                onBlur={() => {
                    updateWorkspaceEntry({
                        workspaceEntryId: workspaceEntry._id,
                        caption: caption,
                    });
                }} 
            />
            <Button variant="destructive" className="size-8" onClick={() => {
                deleteWorkspaceEntry({ workspaceEntryId: workspaceEntry._id });
            }}><Trash /></Button>
        </>
    );
}