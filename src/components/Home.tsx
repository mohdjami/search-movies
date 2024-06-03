import { FC, JSX, ReactNode, SVGProps, useState } from "react";
import Link from "next/link";
import SearchForm from "./form/SearchBar";
export default function Home() {
  return (
    <>
      <section className="space-y-8 pb-12 h-full pt-4 md:space-y-16 md:pt-10 lg:py-32">
        <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-center">
          Search Movies
        </h1>
        <div className="flex flex-col items-center">
          <h6>
            Press the search button when you are done typing to view proper
            results
          </h6>
        </div>
        <SearchForm />
      </section>
    </>
  );
}

function MountainIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
