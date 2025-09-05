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
      <Card className="w-full max-w-lg p-10">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-muted-foreground">
            <PhoneOff />
            <h2 className="text-2xl uppercase">You left this meeting.</h2>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <Link
            href={`/meeting/${id}`}
            className={buttonVariants({
              variant: "default",
              size: "lg",
              className: "w-full",
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
