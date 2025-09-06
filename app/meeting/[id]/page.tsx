import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";

import { Meeting } from "@/components/meeting";
import { MeetingLogin } from "@/components/meeting-login";

export const generateMetadata = async ({
  params,
}: MeetingPageProps): Promise<Metadata> => {
  const { id } = await params;

  return {
    title: `Meeting ${id}`,
  };
};

interface MeetingPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const MeetingPage = async ({ params, searchParams }: MeetingPageProps) => {
  const user = await currentUser();
  const { id } = await params;
  const { guest } = await searchParams;

  const guestMode = guest === "true";

  if (!user && !guestMode) {
    return (
      <div className="flex items-center justify-center h-[85vh]">
        <MeetingLogin />
      </div>
    );
  }

  return <Meeting id={id} />;
};

export default MeetingPage;
