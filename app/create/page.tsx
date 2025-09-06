import { Metadata } from "next";

import { CreateMeeting } from "@/components/create-meeting";

export const metadata: Metadata = {
  title: "Create meeting",
};

const CreateMeetingPage = () => {
  return (
    <section className="h-full flex items-center justify-center">
      <CreateMeeting />
    </section>
  );
};

export default CreateMeetingPage;
