import { PhoneOff } from "lucide-react";
import { useCallStateHooks } from "@stream-io/video-react-sdk";

import { Button } from "@/components/ui/button";

import { useStreamCall } from "@/hooks/use-stream-call";

export const EndCallButton = () => {
  const call = useStreamCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const participantIsChannelOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!participantIsChannelOwner) {
    return null;
  }

  return (
    <Button
      variant="destructive"
      size="lg"
      onClick={call.endCall}
      className="cursor-pointer mx-auto flex items-center gap-2"
    >
      <PhoneOff />
      End call for everyone
    </Button>
  );
};
