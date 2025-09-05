"use client";

import { useState, useEffect, useRef } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ParticipantsInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ParticipantsInput = ({
  value,
  onChange,
}: ParticipantsInputProps) => {
  const [active, setActive] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (active && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [active]);

  return (
    <div className="space-y-2 p-2">
      <h3 className="font-medium">Participants:</h3>

      <RadioGroup
        value={active ? "private" : "public"}
        onValueChange={(val) => {
          if (val === "public") {
            setActive(false);
            onChange("");
          } else {
            setActive(true);
          }
        }}
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem value="public" id="public" />
          <Label htmlFor="public">Everyone with link can join</Label>
        </div>

        <div className="flex items-center gap-2">
          <RadioGroupItem value="private" id="private" />
          <Label htmlFor="private">Private meeting</Label>
        </div>
      </RadioGroup>

      {active && (
        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="participants">Participant emails</Label>
          <Textarea
            ref={textareaRef}
            id="participants"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter participant email addresses separated by commas"
            className="resize-none"
          />
        </div>
      )}
    </div>
  );
};
