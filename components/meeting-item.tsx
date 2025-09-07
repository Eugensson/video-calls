"use client";

import Link from "next/link";
import { Call } from "@stream-io/video-react-sdk";

interface MeetingItemProps {
  call: Call;
}

export const MeetingItem = ({ call }: MeetingItemProps) => {
  const meetingLink = `/meeting/${call.id}`;

  const isInFuture =
    call.state.startsAt && new Date(call.state.startsAt) > new Date();

  const hasEnded = !!call.state.endedAt;

  return (
    <>
      <Link href={meetingLink} className="hover:underline">
        {call.state.startsAt?.toLocaleString()}
        {isInFuture && " (Upcoming)"}
        {hasEnded && " (Ended)"}
      </Link>
      <p className="ml-6 text-muted-foreground">
        {call.state.custom.description}
      </p>
    </>
  );
};
