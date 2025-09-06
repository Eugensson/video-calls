import type { Metadata } from "next";

import { Meetings } from "@/components/meetings";

export const metadata: Metadata = {
  title: "My Meetings",
};

const MyMeetingsPage = () => {
  return (
    <section className="h-full flex flex-col items-center justify-center">
      <Meetings />
    </section>
  );
};

export default MyMeetingsPage;
