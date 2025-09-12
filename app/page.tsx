"use client";

import {
  Authenticated,
  Unauthenticated,
  useQuery,
} from "convex/react";
import { api } from "../convex/_generated/api";
import Header from "@/components/header/Header";
import SignInForm from "@/components/signinform/SignInForm";

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
