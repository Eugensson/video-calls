import Link from "next/link";
import { toast } from "sonner";
import { useMemo } from "react";
import { Copy } from "lucide-react";
import { Call } from "@stream-io/video-react-sdk";

import { Button } from "@/components/ui/button";

interface MeetingLinkProps {
  call: Call;
}

export const MeetingLink = ({ call }: MeetingLinkProps) => {
  const meetingLink = useMemo(
    () => `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`,
    [call.id]
  );

  const mailToLink = useMemo(() => {
    const startsAt = call.state.startsAt;
    const description = call.state.custom?.description;

    const startDateFormatted = startsAt
      ? startsAt.toLocaleString("en-US", {
          dateStyle: "full",
          timeStyle: "short",
        })
      : undefined;

    const subject =
      "Join my meeting" +
      (startDateFormatted ? ` at ${startDateFormatted}` : "");

    const body =
      `Join my meeting at ${meetingLink}.` +
      (startDateFormatted
        ? `\n\nThe meeting starts at ${startDateFormatted}`
        : "") +
      (description ? `\n\nDescription: ${description}` : "");

    return `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [call.state.startsAt, call.state.custom?.description, meetingLink]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(meetingLink);
      toast.info("Invitation link copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy link");
      console.error(err);
    }
  };

  return (
    <section className="flex flex-col items-center gap-3 text-center">
      <div className="flex items-center gap-3 text-xs overflow-hidden">
        <span>Invitation link:</span>
        <Link
          href={meetingLink}
          className="text-muted-foreground truncate max-w-xs"
        >
          {meetingLink}
        </Link>
        <Button
          onClick={copyToClipboard}
          title="Copy invitation link"
          size="icon"
          variant="outline"
          className="cursor-pointer"
        >
          <Copy />
        </Button>
      </div>

      <Link
        target="_blank"
        href={mailToLink}
        className="text-blue-500 hover:underline"
      >
        Send email invitation
      </Link>
    </section>
  );
};
