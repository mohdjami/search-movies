import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { Book, HandMetal, Home } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UserAccountNav from "./UserAccountNav";
import { ModeToggle } from "./mode-toggle";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className=" bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <div className="flex gap-4">
          {" "}
          <Link href="/">
            <Home className="dark:text-black h-10 w-10" />
          </Link>{" "}
          <ModeToggle />
        </div>
        <header className="px-4 lg:px-6 h-14 flex items-center">
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link
              href="/search"
              className="text-sm font-medium hover:underline underline-offset-4 dark:text-slate-900"
              prefetch={false}
            >
              Search Movies
            </Link>
            <Link
              href="/#features"
              className="text-sm font-medium hover:underline underline-offset-4 dark:text-slate-900"
              prefetch={false}
            >
              Features
            </Link>

            <Link
              href="/#pricing"
              className="text-sm font-medium hover:underline underline-offset-4 dark:text-slate-900"
              prefetch={false}
            >
              Pricing
            </Link>
            <Link
              href="/#about"
              className="text-sm font-medium hover:underline underline-offset-4 dark:text-slate-900"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4 dark:text-slate-900"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
        </header>
        {session?.user ? (
          <UserAccountNav />
        ) : (
          <Link
            className={buttonVariants({ variant: "secondary" })}
            href="/sign-in"
          >
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
