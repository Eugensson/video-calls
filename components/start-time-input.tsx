"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface StartTimeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const StartTimeInput = ({ value, onChange }: StartTimeInputProps) => {
  const [active, setActive] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );
  const [time, setTime] = useState<string>("10:30");

  const now = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60_000
  );

  const updateDateTime = (d?: Date, t?: string) => {
    if (!d || !t) return;
    const [hours, minutes] = t.split(":").map(Number);
    const updated = new Date(d);
    updated.setHours(hours, minutes, 0, 0);
    onChange(updated.toISOString());
  };

  return (
    <div className="space-y-2 p-2">
      <h3 className="font-medium">Meeting start:</h3>

      <RadioGroup
        value={active ? "scheduled" : "immediate"}
        onValueChange={(val) => {
          if (val === "immediate") {
            setActive(false);
            setDate(undefined);
            onChange("");
          } else {
            setActive(true);
            setDate(now);
            setTime("10:30");
            updateDateTime(now, "10:30");
          }
        }}
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem value="immediate" id="immediate" />
          <Label htmlFor="immediate">Start meeting immediately</Label>
        </div>

        <div className="flex items-center gap-2">
          <RadioGroupItem value="scheduled" id="scheduled" />
          <Label htmlFor="scheduled">Start meeting at date/time</Label>
        </div>
      </RadioGroup>

      {active && (
        <div className="flex gap-4 mt-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="date-picker">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker"
                  className="w-50 justify-between font-normal"
                >
                  {date ? format(date, "PPP") : "Select date"}
                  <ChevronDownIcon className="size-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => {
                    setDate(d);
                    updateDateTime(d, time);
                  }}
                  disabled={(d) => d < now}
                  initialFocus
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="time-picker">Time</Label>
            <Input
              type="time"
              id="time-picker"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
                updateDateTime(date, e.target.value);
              }}
              step={60}
              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
            />
          </div>
        </div>
      )}
    </div>
  );
};
