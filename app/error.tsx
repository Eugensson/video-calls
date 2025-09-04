"use client";

import Link from "next/link";
import { TriangleAlert } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

const ErrorPage = () => {
  return (
    <div className="h-[75vh] flex items-center justify-center">
      <Card className="w-full max-w-md p-6 bg-destructive/5">
        <CardHeader className="gap-4">
          <CardTitle className="mx-auto">
            <h1 className="text-2xl font-bold flex items-center gap-2 text-destructive">
              <TriangleAlert />
              Error
            </h1>
          </CardTitle>
          <CardDescription className="text-center">
            Sorry, something went wrong. Please try again.
          </CardDescription>
        </CardHeader>
        <Link
          href="/"
          className={buttonVariants({
            variant: "default",
            size: "lg",
            className: "max-w-50 mx-auto",
          })}
        >
          Go back to home
        </Link>
      </Card>
    </div>
  );
};

export default ErrorPage;
