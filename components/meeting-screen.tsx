"use client";

import { useState } from "react";
import { useCallStateHooks } from "@stream-io/video-react-sdk";

import { CallUi } from "@/components/call-ui";
import { SetupUi } from "@/components/setup-ui";
import { MeetingEndedScreen } from "@/components/meeting-ended-screen";
import { UpcommingMeetingScreen } from "@/components/upcomming-meeting-screen";

import { useStreamCall } from "@/hooks/use-stream-call";

export const MeetingScreen = () => {
  const call = useStreamCall();
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callEndedAt = useCallEndedAt();
  const callStartsAt = useCallStartsAt();
  const [setupComplete, setSetupComplete] = useState<boolean>(false);

  const handleSetupComplete = async () => {
    call.join();
    setSetupComplete(true);
  };

  const callIsInFuture = callStartsAt && new Date(callStartsAt) > new Date();

  const callHasEnded = !!callEndedAt;

  if (callHasEnded) {
    return <MeetingEndedScreen />;
  }

  if (callIsInFuture) {
    return <UpcommingMeetingScreen />;
  }

  const description = call.state.custom.description;

  return (
    <div className="space-y-6">
      {description && (
        <p className="text-center">
          Meeting description: <span className="font-bold">{description}</span>
        </p>
      )}
      {setupComplete ? (
        <CallUi />
      ) : (
        <SetupUi onSetupComplete={handleSetupComplete} />
      )}
    </div>
  );
};
