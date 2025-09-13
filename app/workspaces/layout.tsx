"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import Sidebar from "@/components/sidebar/Sidebar";
import SignInForm from "@/components/signinform/SignInForm";
import Header from "@/components/header/Header";



export default function WorkspacesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <>
  
  <Authenticated>
    <Authenticated>
      <Header />
    </Authenticated>
    <div className="flex flex-row h-full">
      <Sidebar className="flex-none w-64"/>
      <div className="flex-grow">
        {children}
      </div>
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
