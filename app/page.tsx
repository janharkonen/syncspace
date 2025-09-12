"use client";

import {
  Authenticated,
  Unauthenticated,
  useQuery,
} from "convex/react";
import { api } from "../convex/_generated/api";
import Link from "next/link";
import { SignUpButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import DarkModeToggle from "@/components/header/DarkModeToggle";
import Header from "@/components/header/Header";

export default function Home() {
  return (
    <>
      <main className="flex flex-col h-screen flex-grow">
        <Authenticated>
          <Header />
          <Content />
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

function SignInForm() {
  return (
    <>
      <Card className="w-full max-w-xl">
        <div className="relative flex flex-row px-6 justify-between">
          <DarkModeToggle />
          <SignUpButton mode="modal">
            <Button variant="link" className="hover:cursor-pointer">Sign Up</Button>
          </SignUpButton>
        </div>
        <img 
        src="https://picapi.janharkonen.fi/api/pics/3719108934fb4269a77a48b10c61955a.png"
        alt="SyncSpace Logo"
        style={{
          aspectRatio: 1 / 1,
        }}
        className="logo-img opacity-80 max-h-60 max-w-60 w-full aspect-square self-center"
        />
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">SyncSpace</CardTitle>
          {/*
        */}
        </CardHeader>
        <CardFooter className="flex-col gap-2">
          <SignInButton mode="modal">
            <Button type="submit" className="w-full hover:cursor-pointer">Login</Button>
          </SignInButton>
        </CardFooter>
      </Card>
    </>
  );
}

function Content() {
  const { memoEntries } = useQuery(api.memoFunctions.memoItems) ?? { memoEntries: [] };
  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto">
        {memoEntries.map((memoEntry) => (
          <div key={memoEntry._id}>
            <h2>{memoEntry.memoname}</h2>
          </div>
        ))}
    </div>
  );
}
