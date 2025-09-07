"use client";

import { Loader } from "lucide-react";
import { CallingState, useCallStateHooks } from "@stream-io/video-react-sdk";

import { FlexibleCallLayout } from "@/components/flexible-call-layout";

export const CallUi = () => {
  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <Loader className="mx-auto animate-spin" />;
  }

  return <FlexibleCallLayout />;
};
