"use client";

import { Authenticated } from "convex/react";
import Header from "@/components/header/Header";

export default function WorkspacesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Authenticated>
      <Header/>
    {children}
    </Authenticated>
    </>
  );
}
