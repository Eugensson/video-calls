"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Loader, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { deleteRecording } from "@/actions";
import { useStreamCall } from "@/hooks/use-stream-call";
import { useLoadRecordings } from "@/hooks/use-load-recordings";

export const RecordingsList = () => {
  const call = useStreamCall();
  const { recordings: initialRecordings, recordingsLoading } =
    useLoadRecordings(call);
  const { user, isLoaded: userLoaded } = useUser();

  const [recordings, setRecordings] = useState(initialRecordings);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [recordingToDelete, setRecordingToDelete] = useState<{
    sessionId: string;
    filename: string;
    url: string;
  } | null>(null);

  useEffect(() => {
    setRecordings(initialRecordings);
  }, [initialRecordings]);

  if (userLoaded && !user) {
    return (
      <p className="text-center">You must be logged in to view recordings.</p>
    );
  }

  if (recordingsLoading) return <Loader className="animate-spin" />;

  const confirmDelete = (sessionId: string, filename: string, url: string) => {
    setRecordingToDelete({ sessionId, filename, url });
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!call || !recordingToDelete) return;

    setDeleting(recordingToDelete.url);
    setDialogOpen(false);

    try {
      const res = await deleteRecording(
        call.type,
        call.id,
        recordingToDelete.sessionId,
        recordingToDelete.filename
      );

      if (res.success) {
        toast.success("Recording deleted successfully");
        setRecordings((prev) =>
          prev.filter((r) => r.url !== recordingToDelete.url)
        );
      } else {
        toast.error(res.error || "Failed to delete recording");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Unexpected error deleting recording");
    } finally {
      setDeleting(null);
      setRecordingToDelete(null);
    }
  };

  return (
    <div className="space-y-3 text-center">
      {recordings.length === 0 && <p>No recordings for this meeting.</p>}
      <ul className="list-inside list-disc">
        {recordings
          .sort((a, b) => b.end_time.localeCompare(a.end_time))
          .map((recording) => (
            <li
              key={recording.url}
              className="flex items-center justify-between"
            >
              <Link
                href={recording.url}
                target="_blank"
                className="hover:underline"
              >
                {new Date(recording.end_time).toLocaleString()}
              </Link>
              <Button
                size="icon"
                variant="destructive"
                aria-label="Delete recording"
                title="Delete recording"
                onClick={() =>
                  confirmDelete(
                    recording.session_id,
                    recording.filename,
                    recording.url
                  )
                }
                disabled={deleting === recording.url}
                className="cursor-pointer"
              >
                {deleting === recording.url ? (
                  <Loader className="animate-spin" />
                ) : (
                  <Trash2 />
                )}
              </Button>
            </li>
          ))}
      </ul>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this recording? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="cursor-pointer"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <p className="text-sm text-muted-foreground">
        Note: It can take up to 1 minute before new recordings show up.
        <br />
        You can refresh the page to see if new recordings are available.
      </p>
    </div>
  );
};
