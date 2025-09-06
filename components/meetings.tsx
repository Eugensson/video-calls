"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Headset, Loader } from "lucide-react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Meetings = () => {
  const { user } = useUser();

  const client = useStreamVideoClient();

  const [calls, setCalls] = useState<Call[]>();

  useEffect(() => {
    async function loadCalls() {
      if (!client || !user?.id) {
        return;
      }

      const { calls } = await client.queryCalls({
        sort: [{ field: "starts_at", direction: -1 }],
        filter_conditions: {
          starts_at: { $exists: true },
          $or: [
            { created_by_user_id: user.id },
            { members: { $in: [user.id] } },
          ],
        },
      });

      setCalls(calls);
    }

    loadCalls();
  }, [client, user?.id]);

  return (
    <Card className="w-full max-w-lg py-8 px-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          <Headset />
          <h2 className="text-2xl font-bold">My Meetings</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-100">
          {!calls && <Loader className="mx-auto my-40 animate-spin" />}
          {calls?.length === 0 && (
            <div className="py-32 flex flex-col items-center justify-center gap-10">
              <p className="text-center">No meetings found.</p>
              <Link
                href="/"
                className={buttonVariants({
                  variant: "default",
                  size: "lg",
                  className: "w-fit",
                })}
              >
                Create a new meeting
              </Link>
            </div>
          )}
          <ul className="list-inside list-disc space-y-4">
            {calls?.map((call) => (
              <MeetingItem key={call.id} call={call} />
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

interface MeetingItemProps {
  call: Call;
}

const MeetingItem = ({ call }: MeetingItemProps) => {
  const meetingLink = `/meeting/${call.id}`;

  const isInFuture =
    call.state.startsAt && new Date(call.state.startsAt) > new Date();

  const hasEnded = !!call.state.endedAt;

  return (
    <li>
      <Link href={meetingLink} className="hover:underline">
        {call.state.startsAt?.toLocaleString()}
        {isInFuture && " (Upcoming)"}
        {hasEnded && " (Ended)"}
      </Link>
      <p className="ml-6 text-muted-foreground">
        {call.state.custom.description}
      </p>
    </li>
  );
};
