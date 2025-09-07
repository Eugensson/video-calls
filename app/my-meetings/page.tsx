import type { Metadata } from "next";

import { MeetingList } from "@/components/meeting-list";

export const metadata: Metadata = {
  title: "My Meeting List",
};

const MyMeetingsPage = () => {
  return (
    <section className="h-full flex flex-col items-center justify-center">
      <MeetingList />
    </section>
  );
};

export default MyMeetingsPage;
