import {
  BetweenHorizonalEnd,
  BetweenVerticalEnd,
  LayoutGrid,
} from "lucide-react";
import { useState } from "react";
import {
  CallControls,
  SpeakerLayout,
  PaginatedGridLayout,
} from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { EndCallButton } from "@/components/end-call-button";

import { useStreamCall } from "@/hooks/use-stream-call";

type CallLayout = "speaker-vertical" | "speaker-horizontal" | "grid";

export const FlexibleCallLayout = () => {
  const [layout, setLayout] = useState<CallLayout>("speaker-vertical");
  const call = useStreamCall();
  const router = useRouter();

  return (
    <section className="space-y-3">
      <CallLayoutButtons layout={layout} setLayout={setLayout} />
      <CallLayoutView layout={layout} />
      <CallControls onLeave={() => router.push(`/meeting/${call.id}/left`)} />
      <EndCallButton />
    </section>
  );
};

interface CallLayoutButtonsProps {
  layout: CallLayout;
  setLayout: (layout: CallLayout) => void;
}

const CallLayoutButtons = ({ layout, setLayout }: CallLayoutButtonsProps) => {
  return (
    <div className="mx-auto w-fit space-x-6">
      <Button
        size="icon"
        variant="outline"
        className="cursor-pointer"
        onClick={() => setLayout("speaker-vertical")}
        aria-label="speaker-vertical"
        title="Speaker vertical"
      >
        <BetweenVerticalEnd
          className={layout !== "speaker-vertical" ? "text-gray-400" : ""}
        />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="cursor-pointer"
        onClick={() => setLayout("speaker-horizontal")}
        aria-label="speaker-horizontal"
        title="Speaker horizontal"
      >
        <BetweenHorizonalEnd
          className={layout !== "speaker-horizontal" ? "text-gray-400" : ""}
        />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="cursor-pointer"
        onClick={() => setLayout("grid")}
        aria-label="grid"
        title="Grid"
      >
        <LayoutGrid className={layout !== "grid" ? "text-gray-400" : ""} />
      </Button>
    </div>
  );
};

interface CallLayoutViewProps {
  layout: CallLayout;
}

const CallLayoutView = ({ layout }: CallLayoutViewProps) => {
  switch (layout) {
    case "speaker-vertical":
      return <SpeakerLayout />;
    case "speaker-horizontal":
      return <SpeakerLayout participantsBarPosition="right" />;
    case "grid":
      return <PaginatedGridLayout />;
    default:
      return null;
  }
};
