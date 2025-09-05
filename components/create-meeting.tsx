"use client";

import { toast } from "sonner";
import { useState } from "react";
import {
  Call,
  MemberRequest,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Loader } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MeetingLink } from "@/components/meeting-link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StartTimeInput } from "@/components/start-time-input";
import { DescriptionInput } from "@/components/description-input";
import { ParticipantsInput } from "@/components/participants-input";

import { getUserIds } from "@/actions";

export const CreateMeeting = () => {
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call>();
  const [startTimeInput, setStartTimeInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [participantsInput, setParticipantsInput] = useState<string>("");

  const createMeeting = async () => {
    if (!user || !client) return;

    try {
      const id = crypto.randomUUID();

      const callType = participantsInput ? "private-meeting" : "default";

      const call = client.call(callType, id);

      const memberEmails = participantsInput
        .split(",")
        .map((email) => email.trim());

      const memberIds = await getUserIds(memberEmails);

      console.log("memberIds", memberIds);

      if (participantsInput && memberIds.length === 0) {
        toast.error(
          "You need to add at least one participant for a private meeting"
        );
        return;
      }

      const members: MemberRequest[] = memberIds
        .map((id) => ({ user_id: id, role: "call_member" }))
        .concat({ user_id: user.id, role: "call_member" })
        .filter(
          (v, i, a) => a.findIndex((v2) => v2.user_id === v.user_id) === i
        );

      const starts_at = new Date(startTimeInput || Date.now()).toISOString();

      await call.getOrCreate({
        data: {
          starts_at,
          members,
          custom: { description: descriptionInput },
        },
      });

      setCall(call);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (!user || !client) {
    return <Loader className="animate-spin" />;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="gap-2">
        <CardTitle>
          <h1 className="text-2xl font-bold text-center">
            Welcome {user.username}!
          </h1>
        </CardTitle>
        <CardDescription className="text-lg text-center">
          Create a new meeting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-75 w-full pr-4">
          <div className="space-y-4">
            <DescriptionInput
              value={descriptionInput}
              onChange={setDescriptionInput}
            />
            <StartTimeInput
              value={startTimeInput}
              onChange={setStartTimeInput}
            />
            <ParticipantsInput
              value={participantsInput}
              onChange={setParticipantsInput}
            />
          </div>
        </ScrollArea>
        <Button
          onClick={createMeeting}
          className="mx-auto flex justify-center min-w-50 cursor-pointer"
        >
          Create meeting
        </Button>
      </CardContent>
      {call && (
        <CardFooter className="px-2 justify-center">
          <MeetingLink call={call} />
        </CardFooter>
      )}
    </Card>
  );
};
