"use client";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";
import CreatePlaylistNewDrawer from "./create-playlist-drawer";
import { redirect } from "next/navigation";
import { Icons } from "./Icons";
export type Movie = {
  title: string;
  year: string;
  imdbID: string;
  poster: string;
  type: string;
};

type Playlist = {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  visibility: boolean;
  movies: Movie[];
};
export default function Dashboard() {
  const [playlists, setPlaylists] = useState([]);
  const [deleted, isDeleted] = useState(false);
  const [loading, isLoading] = useState(false);
  useEffect(() => {
    const fetchPlaylists = async () => {
      isLoading(true);
      const res = await fetch("/api/playlists/get-all", {
        method: "GET",
      });
      const data = await res.json();
      setPlaylists(data.playlists);
      isLoading(false);
    };
    fetchPlaylists();
  }, []);

  if (loading) {
    return <div className="m-32">Loading...</div>;
  }
  return (
    <div className="flex h-full ">
      <main className="flex-1">
        <div className="lg:flex grid  items-center justify-between m-10">
          <h1 className="text-3xl font-bold mb-6 flex items-center">
            Playlists
          </h1>{" "}
          <CreatePlaylistNewDrawer />
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((playlist: Playlist) => {
              return (
                <Card
                  key={playlist.id}
                  className="flex flex-col flex-grow gap-5 justify-between"
                >
                  <CardHeader>
                    <CardTitle>{playlist.name}</CardTitle>
                    <CardDescription>{playlist.description}</CardDescription>
                    <CardDescription>
                      {playlist.visibility
                        ? "Private Playlist"
                        : "Public Playlist"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {playlist.movies.length !== 0 ? (
                        playlist.movies.slice(0, 3).map((movie: Movie) => {
                          return <li key={movie.imdbID}>{movie.title}</li>;
                        })
                      ) : (
                        <li>
                          <Link href="/search" className=" underline">
                            {" "}
                            Click here to add movies
                          </Link>
                        </li>
                      )}
                      <li>...</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-center space-x-2">
                      <Button variant="outline">Edit</Button>
                      <Button
                        variant="destructive"
                        onClick={async () => {
                          isDeleted(true);
                          const res = await fetch(
                            `/api/playlists/create-playlist/?id=${playlist.id}`,
                            {
                              method: "DELETE",
                            }
                          );
                          if (res.ok) {
                            isDeleted(false);
                            window.location.reload();
                          }
                          isDeleted(false);
                        }}
                      >
                        {deleted ? (
                          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          "Delete"
                        )}
                      </Button>{" "}
                      <Link
                        href={`/dashboard/${playlist.id}`}
                        className={buttonVariants({ variant: "default" })}
                      >
                        View
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
