"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const { memoEntries } = useQuery(api.memoFunctions.memoItems) ?? { memoEntries: [] };
  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto">
        {memoEntries.map((memoEntry) => (
          <div key={memoEntry._id}>
            <h2>{memoEntry.memoname}</h2>
          </div>
        ))}
    </div>
  );
}