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
      <div className="flex-grow">
        {children}
      </div>
  );
}
