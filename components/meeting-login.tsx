import Link from "next/link";
import { Loader } from "lucide-react";
import { ClerkLoaded, ClerkLoading, SignInButton } from "@clerk/nextjs";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { cn } from "@/lib/utils";

export const MeetingLogin = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="text-center text-2xl font-bold">Join meeting</h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-x-4">
        <ClerkLoaded>
          <SignInButton>
            <Button className="w-50 cursor-pointer">Sign in</Button>
          </SignInButton>
          <Link
            href="?guest=true"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
              }),
              "w-50"
            )}
          >
            Continue as guest
          </Link>
        </ClerkLoaded>
        <ClerkLoading>
          <Loader className="animate-spin" />
        </ClerkLoading>
      </CardContent>
    </Card>
  );
};
