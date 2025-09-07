"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Loader, TriangleAlert } from "lucide-react";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { MeetingScreen } from "@/components/meeting-screen";

import { useLoadCall } from "@/hooks/use-load-call";

interface MeetingProps {
  id: string;
}

export const Meeting = ({ id }: MeetingProps) => {
  const { user, isLoaded: userLoaded } = useUser();

  const { call, callLoading } = useLoadCall(id);

  if (!userLoaded || callLoading) {
    return <Loader className="animate-spin" />;
  }

  if (!call) {
    return <p className="text-center font-bold">Call not found</p>;
  }

  const notAllowedToJoin =
    call.type === "private-meeting" &&
    (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowedToJoin) {
    return (
      <div className="h-[85vh] flex flex-col items-center justify-center gap-10">
        <Card className="p-8 w-full max-w-lg space-y-6">
          <CardHeader className="gap-4">
            <CardTitle className="flex items-stretch justify-center gap-2 text-destructive">
              <TriangleAlert />
              <span className="text-xl font-semibold">Access denied!</span>
            </CardTitle>
            <CardDescription className="text-center">
              This is a private meeting. Only invited members can join.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link
              href="/"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              Go to homepage
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        <MeetingScreen />
      </StreamTheme>
    </StreamCall>
  );
};
