"use client";

import { useState, useEffect, useRef } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const DescriptionInput = ({
  value,
  onChange,
}: DescriptionInputProps) => {
  const [active, setActive] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (active && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [active]);

  return (
    <div className="space-y-2 p-2">
      <h3 className="font-medium">Meeting info:</h3>
      <div className="flex items-center gap-2">
        <Checkbox
          checked={active}
          onCheckedChange={(checked) => {
            setActive(!!checked);
            if (!checked) onChange("");
          }}
          id="add-description"
        />
        <Label htmlFor="add-description">Add description</Label>
      </div>
      {active && (
        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            ref={textareaRef}
            id="description"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={500}
            className="resize-none"
          />
        </div>
      )}
    </div>
  );
};
