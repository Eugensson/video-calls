import type { Metadata } from "next";

import { Meetings } from "@/components/meetings";

export const metadata: Metadata = {
  title: "My Meetings",
};

const MyMeetingsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[85vh]">
      <Meetings />
    </div>
  );
};

export default MyMeetingsPage;
