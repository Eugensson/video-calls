import Link from "next/link";
import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { buttonVariants } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <header className="shadow">
      <div className="max-w-7xl mx-auto h-14 p-3 flex items-center justify-between font-medium">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/logo.png" alt="Logo" width={25} height={25} />
          <span className="hidden md:block">Video Calls</span>
        </Link>
        <SignedIn>
          <div className="flex items-center gap-2 xl:gap-4">
            <Link
              href="/create"
              className={buttonVariants({
                variant: "outline",
                className: "flex items-center gap-2",
              })}
            >
              <PlusCircle />
              <span className="hidden md:block">Create</span>
            </Link>
            <Link
              href="/my-meetings"
              className={buttonVariants({
                variant: "outline",
              })}
            >
              Meetings
            </Link>
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <SignedIn />
        </SignedOut>
      </div>
    </header>
  );
};
