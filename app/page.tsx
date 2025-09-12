"use client";

import {
  Authenticated,
  Unauthenticated,
} from "convex/react";
import SignInForm from "@/components/signinform/SignInForm";

export default function Home() {
  return (
    <>
      <main className="flex flex-col h-screen flex-grow">
        <Authenticated>
          <h1 className="text-2xl font-bold flex justify-center items-center">You&apos;re not supposed to see this</h1>
        </Authenticated>
        <Unauthenticated>
          <div className="w-full h-screen flex justify-center items-center">
            <SignInForm />
          </div>
        </Unauthenticated>
      </main>
    </>
  );
}