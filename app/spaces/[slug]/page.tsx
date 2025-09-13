"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams } from "next/navigation";

export default function Home() {
  const { slug } = useParams();
  const { memoEntries } = useQuery(api.memoFunctions.memoItems) ?? { memoEntries: [] };
  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto">
        <h1>{slug}</h1>
        {memoEntries.map((memoEntry) => (
          <div key={memoEntry._id}>
            <h2>{memoEntry.memoname}</h2>
          </div>
        ))}
    </div>
  );
}