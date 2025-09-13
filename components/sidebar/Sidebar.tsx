import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useQuery,
} from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter, useParams } from "next/navigation";

export default function Sidebar({className}: {className: string}) {
  const { memoEntries } = useQuery(api.memoFunctions.memoItems) ?? { memoEntries: [] };
  const router = useRouter();
  const { spaceId } = useParams<{ spaceId: string }>();
  return (
    <>
    <div className={cn("text-white h-full sidebar bg-[var(--header-background)] overflow-y-auto border-r-1 border-header-border", className)}>
        <div>
            <div>
                {memoEntries.map((memoEntry) => (
                    <Button
                    key={memoEntry._id}
                        className="
                            w-full 
                            cursor-pointer 
                            overflow-hidden 
                            text-ellipsis 
                            whitespace-nowrap
                        "
                        variant={spaceId === memoEntry._id ? "sidebarbuttonactive" : "sidebarbutton"}
                        onClick={() => { 
                            router.push(`/spaces/${memoEntry._id}`);
                        }}
                        >
                        {memoEntry.memoname}
                    </Button>
                ))}
            </div>
        </div>
    </div>
    </>
  )
}