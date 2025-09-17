"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import Sidebar from "@/components/sidebar/Sidebar";
import SignInForm from "@/components/signinform/SignInForm";
import Header from "@/components/header/Header";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"



export default function WorkspacesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <>
  
  <Authenticated>
    <Header />
    <div className="flex flex-row h-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={16}>
          <Sidebar className="flex-none w-full"/>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <div className="flex-grow">
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  </Authenticated>
  <Unauthenticated>
    <div className="w-full h-screen flex justify-center items-center">
      <SignInForm />
    </div>
  </Unauthenticated>
  </>
  );
}
