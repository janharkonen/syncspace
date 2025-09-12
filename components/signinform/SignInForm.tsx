import { Card, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import DarkModeToggle from "@/components/header/DarkModeToggle";
import { SignUpButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function SignInForm() {
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