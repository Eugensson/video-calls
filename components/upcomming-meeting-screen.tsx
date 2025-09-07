"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { useStreamCall } from "@/hooks/use-stream-call";

export const UpcommingMeetingScreen = () => {
  const call = useStreamCall();

  return (
    <div className="flex flex-col items-center gap-6">
      <p>
        This meeting hes not started yet. It will start at{" "}
        <span className="font-bold">
          {call.state.startsAt?.toLocaleString()}
        </span>
      </p>
      {call.state.custom.description && (
        <p>
          Description:{" "}
          <span className="font-bold">{call.state.custom.description}</span>
        </p>
      )}
      <Link
        href="/"
        className={buttonVariants({ variant: "outline", size: "lg" })}
      >
        Back to homepage
      </Link>
    </div>
  );
};
