import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
                    <div key={workspaceEntry._id}>
                        <h2>{workspaceEntry.caption}</h2>
                    </div>
                ))}
            </CardContent>
        </Card>
    </div>
  );
}