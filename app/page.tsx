import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

const Home = () => {
  return (
    <section className="h-full flex flex-col items-center justify-center gap-10 text-center">
      <h1 className="text-3xl xl:text-7xl font-bold">
        Connect Instantly with High-Quality Online Meetings
      </h1>
      <p className="text-xl xl:text-4xl text-muted-foreground">
        Host seamless video calls with crystal-clear audio and HD video. Enjoy
        secure, reliable, and user-friendly online meetings for teams, friends,
        and clients.
      </p>
      <Link
        href="/create"
        className={buttonVariants({
          variant: "default",
          size: "lg",
          className: "flex items-center gap-2",
        })}
      >
        <PlusCircle />
        <span>Create meeting</span>
      </Link>
    </section>
  );
};

export default Home;
