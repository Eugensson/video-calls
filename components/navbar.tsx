import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export const Navbar = () => {
  return (
    <header className="shadow">
      <div className="max-w-5xl mx-auto h-14 p-3 flex items-center justify-between font-medium">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/logo.png" alt="Logo" width={25} height={25} />
          Video Calls
        </Link>
        <SignedIn>
          <div className="flex items-center gap-5">
            <Link href="/my-meetings">Meetings</Link>
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
