import Link from "next/link";
import { HandMetal, HomeIcon, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { getCurrentUser } from "@/lib/session";
import { navLinks } from "@/config/links";
const HeaderRoutes = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger>
            <Menu className="h-6 md:hidden w-6 text-white dark:text-black" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              {navLinks.data.map((route, i) => (
                <Link
                  key={i}
                  href={route.href || "/"}
                  className="block px-2 py-1 text-lg "
                >
                  {route.title}
                </Link>
              ))}
              {user ? (
                <>
                  {" "}
                  <Link href="/search" className="block px-2 py-1 text-lg ">
                    Search Movies
                  </Link>{" "}
                  <Link href="/dashboard" className="block px-2 py-1 text-lg ">
                    Dashboard
                  </Link>
                </>
              ) : (
                <Link
                  href="/sign-up"
                  className="text-sm font-medium transition-colors text-[#ffffff] dark:text-black"
                >
                  Get started
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
        <Link className="flex items-center justify-center" href="/">
          <Link href="/">
            <HomeIcon className=" md:block hidden text-[#ffffff] dark:text-black" />
          </Link>{" "}
          <span className="ml-2 text-lg font-bold text-[#ffffff] dark:text-black">
            Search Engine
          </span>
        </Link>
      </div>
      <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block">
        {navLinks.data.map((route, i) => (
          <Link
            key={i}
            href={route.href || "/"}
            className="text-sm font-medium transition-colors text-[#ffffff] dark:text-black"
          >
            {route.title}
          </Link>
        ))}
        {user ? (
          <>
            {" "}
            <Link
              href="/search"
              className="text-sm font-medium transition-colors text-[#ffffff] dark:text-black"
            >
              Search Movies
            </Link>{" "}
            <Link
              href="/dashboard"
              className="text-sm font-medium transition-colors text-[#ffffff] dark:text-black"
            >
              Dashboard
            </Link>
          </>
        ) : (
          <Link
            href="/sign-up"
            className="text-sm font-medium transition-colors text-[#ffffff] dark:text-black"
          >
            Get started
          </Link>
        )}
      </nav>
    </>
  );
};

export default HeaderRoutes;
