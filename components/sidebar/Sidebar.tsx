import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useQuery,
} from "convex/react";
import { api } from "../../convex/_generated/api";

function setActiveMemo(id: string) {
    console.log(id);
}

export default function Sidebar({className}: {className: string}) {
  const { memoEntries } = useQuery(api.memoFunctions.memoItems) ?? { memoEntries: [] };
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
                        variant="sidebarbutton"
                        onClick={() => { setActiveMemo(memoEntry._id); }}
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