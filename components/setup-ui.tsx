"use client";

import {
  VideoPreview,
  DeviceSettings,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PermissionPrompt } from "@/components/permission-prompt";
import { AudioVolumeIndicator } from "@/components/audio-volume-indicator";

import { useStreamCall } from "@/hooks/use-stream-call";

interface SetupUiProps {
  onSetupComplete: () => void;
}

export const SetupUi = ({ onSetupComplete }: SetupUiProps) => {
  const call = useStreamCall();

  const { useMicrophoneState, useCameraState } = useCallStateHooks();

  const micState = useMicrophoneState();
  const camState = useCameraState();

  const [micCamDisabled, setMicCamDisabled] = useState(false);

  useEffect(() => {
    if (micCamDisabled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [micCamDisabled, call]);

  if (!micState.hasBrowserPermission || !camState.hasBrowserPermission) {
    return <PermissionPrompt />;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <h2 className="text-2xl font-bold text-center">Setup</h2>
      <VideoPreview />
      <div className="h-16 flex items-center gap-3">
        <AudioVolumeIndicator />
        <DeviceSettings />
      </div>
      <Label className="flex items-center gap-2 font-medium cursor-pointer">
        <Checkbox
          checked={micCamDisabled}
          onCheckedChange={(checked) => setMicCamDisabled(!!checked)}
        />
        Join with mic and camera off
      </Label>
      <Button onClick={onSetupComplete} size="lg" className="cursor-pointer">
        Join meeting
      </Button>
    </div>
  );
};
