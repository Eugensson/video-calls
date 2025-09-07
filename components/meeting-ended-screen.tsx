"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { RecordingsList } from "@/components/recordings-list";

export const MeetingEndedScreen = () => {
  return (
    <section className="h-[85vh] flex flex-col items-center justify-center gap-10">
      <h2 className="text-2xl font-semibold">This meeting has ended.</h2>
      <Link
        href="/"
        className={buttonVariants({ variant: "default", size: "lg" })}
      >
        Back to homepage
      </Link>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center">Recordings</h3>
        <RecordingsList />
      </div>
    </section>
  );
};
