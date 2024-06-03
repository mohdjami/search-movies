import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { JSX, SVGProps } from "react";
import CreateNewPlaylistForm from "./create-new-playlist-form";
import Image from "next/image";
import { ImageFrame } from "./image-frame";

export default function Hero() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y h-full lg:h-screen mt-16 lg:m-2 lg:pb-1 pb-10">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-rows-2 md:gap-16">
              <div className="flex flex-col items-center justify-center">
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Search Movies and Create Playlists
                </h1>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover new movies, create custom playlists, and share them
                  with your friends.
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <Link href="/#top-playlists" className={buttonVariants()}>
                    Getting Started
                  </Link>
                  <Link href="/sign-up" className={buttonVariants()}>
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" id="features">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Featured Movies
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Discover the latest and greatest movies in our featured
                  section.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <ImageFrame>
                  <Image
                    src="https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
                    width="550"
                    height="310"
                    alt="Movie Poster"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  />
                </ImageFrame>
                <h3 className="text-lg font-bold">The Avengers</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Marvel&apos;s superhero team-up movie.
                </p>
              </div>
              <div className="grid gap-1">
                <ImageFrame>
                  <Image
                    src="https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"
                    width="550"
                    height="310"
                    alt="Movie Poster"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  />
                </ImageFrame>
                <h3 className="text-lg font-bold">Inception</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  A mind-bending sci-fi thriller.
                </p>
              </div>
              <div className="grid gap-1">
                <ImageFrame>
                  <Image
                    src="https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg"
                    width="550"
                    height="310"
                    alt="Movie Poster"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  />
                </ImageFrame>
                <h3 className="text-lg font-bold">The Dark Knight</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  The epic conclusion to the Batman trilogy.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
          id="top-playlists"
        >
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Top Playlists
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Check out the most popular playlists created by our users.
                </p>
              </div>
            </div>

            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <Link
                href="https://search-movies-tawny.vercel.app/dashboard/f4e5dd94-3042-4456-98b1-b777f7553fe0"
                className="hover:underline"
              >
                <div className="grid gap-1">
                  <Image
                    src="https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
                    width="550"
                    height="310"
                    alt="Playlist Cover"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  />
                  <h3 className="text-lg font-bold">Action Movie Playlist</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    A collection of the best action movies.
                  </p>
                </div>
              </Link>
              <Link
                href="https://search-movies-tawny.vercel.app/dashboard/dcd2e0c9-7257-4a1d-b544-9a1e8d8f3afe"
                className="hover:underline"
              >
                <div className="grid gap-1">
                  <img
                    src="https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_SX300.jpg"
                    width="550"
                    height="310"
                    alt="Playlist Cover"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  />
                  <h3 className="text-lg font-bold">
                    Romantic Comedy Playlist
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Laugh and fall in love with these romantic comedies.
                  </p>
                </div>
              </Link>
              <Link
                href="https://search-movies-tawny.vercel.app/dashboard/44ef9964-2923-4253-8404-5ce64a2421a2"
                className="hover:underline"
              >
                <div className="grid gap-1">
                  <Image
                    src="https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
                    width="550"
                    height="310"
                    alt="Playlist Cover"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  />
                  <h3 className="text-lg font-bold">Sci-Fi Essentials</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    The must-watch sci-fi movies of all time.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Create Your Own Playlist
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Build a custom playlist of your favorite movies.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md mx-auto w-full max-w-sm space-y-2 border-2 p-10">
              <CreateNewPlaylistForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FilmIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 3v18" />
      <path d="M3 7.5h4" />
      <path d="M3 12h18" />
      <path d="M3 16.5h4" />
      <path d="M17 3v18" />
      <path d="M17 7.5h4" />
      <path d="M17 16.5h4" />
    </svg>
  );
}
