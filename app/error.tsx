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
    <section className="h-full flex items-center justify-center">
      <Card className="w-full max-w-md p-6 bg-destructive/5">
        <CardHeader className="gap-4">
          <CardTitle className="mx-auto">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-destructive">
              <TriangleAlert />
              Error
            </h2>
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
          Back to homepage
        </Link>
      </Card>
    </section>
  );
};

export default ErrorPage;
