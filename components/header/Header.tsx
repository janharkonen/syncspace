import DarkModeToggle from "./DarkModeToggle";
import { UserButton } from "@clerk/nextjs";

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
            <img 
            src="https://picapi.janharkonen.fi/api/pics/3719108934fb4269a77a48b10c61955a.png?BGh=120" 
            alt="SyncSpace logo" 
            style={{
                aspectRatio: 10 / 12,
            }}
            className="logo-img aspect-square max-w-10 max-h-12 flex-grow self-center"
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