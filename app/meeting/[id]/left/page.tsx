import Link from "next/link";
import { PhoneOff } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LeftPageProps {
  params: Promise<{ id: string }>;
}

const LeftPage = async ({ params }: LeftPageProps) => {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center justify-center h-[85vh]">
      <Card className="p-8 w-full max-w-lg space-y-4">
        <CardHeader>
          <CardTitle className="flex items-stretch justify-center gap-2">
            <PhoneOff />
            <span className="text-xl font-semibold">
              You left this meeting.
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <Link
            href={"/"}
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "flex-1",
            })}
          >
            Go to homepage
          </Link>
          <Link
            href={`/meeting/${id}`}
            className={buttonVariants({
              variant: "default",
              size: "lg",
              className: "flex-1",
            })}
          >
            Rejoin
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeftPage;
