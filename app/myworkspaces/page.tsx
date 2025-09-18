"use client";

import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import { ResizableHandle } from "@/components/ui/resizable";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Home() {
  return (
  <>
      {/* Desktop view */}
      <div className="hidden sm:flex flex-row h-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={16}>
            <Sidebar className="flex-none w-full"/>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <div className="flex-grow">
              <div className="flex flex-col justify-center items-center">
                <h1>Choose a workspace from the sidebar</h1>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      {/* Mobile view */}
      <Sidebar className="sm:hidden flex flex-col w-full"/>
  </>
  );
}
