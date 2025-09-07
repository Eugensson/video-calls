"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { RecordingsList } from "@/components/recordings-list";

export const MeetingEndedScreen = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-6">
      <h2 className="text-2xl font-bold">This meeting has ended.</h2>
      <Link
        href="/"
        className={buttonVariants({ variant: "default", size: "lg" })}
      >
        Back to homepage
      </Link>
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-center">Recordings</h3>
        <RecordingsList />
      </div>
    </div>
  );
};
