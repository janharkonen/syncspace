"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams } from "next/navigation";

export default function Home() {
  const { slug } = useParams();
  const { workspaceEntries } = useQuery(api.workspaceFunctions.workspaceItems) ?? { workspaceEntries: [] };
  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto">
        <h1>{slug}</h1>
        {workspaceEntries.map((workspaceEntry) => (
          <div key={workspaceEntry._id}>
            <h2>{workspaceEntry.workspacename}</h2>
          </div>
        ))}
    </div>
  );
}
