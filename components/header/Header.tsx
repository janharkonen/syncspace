import DarkModeToggle from "./DarkModeToggle";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Header() {
    return (
      <header 
      className="
      sticky 
      top-0 
      z-10 
      p-2 
      bg-[var(--header-background)] 
      border-b-[var(--header-border)]
      border-b-2 
      flex 
      flex-row 
      gap-2
      h-12
      "
      >
        <div className="flex flex-row gap-2 items-center flex-grow">
            <Image 
            src="https://picapi.janharkonen.fi/api/pics/3719108934fb4269a77a48b10c61955a.png?BG=110" 
            alt="SyncSpace logo" 
            style={{
                aspectRatio: 1 / 1,
            }}
            width={48} 
            height={48}
            className="aspect-square w-12 h-12 dark:invert"
            />
            <span className="">
                SyncSpace
            </span>
        </div>
        <div className="flex flex-row gap-2">
            <div className="flex" ><DarkModeToggle/></div>
            <div className="flex" ><UserButton/></div>
        </div>
      </header>
    );
  }