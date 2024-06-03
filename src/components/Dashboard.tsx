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
import CreatePlaylistNew from "./create-playlist-drawer";
import { redirect } from "next/navigation";
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
      console.log(data.playlists);
      isLoading(false);
    };
    fetchPlaylists();
  }, []);

  if (loading) {
    return <div className="m-32">Loading...</div>;
  }
  return (
    <div className="flex flex-col h-full mt-20">
      <main className="flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Playlists</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((playlist: Playlist) => {
              return (
                <Card key={playlist.id}>
                  <CardHeader>
                    <CardTitle>{playlist.name}</CardTitle>
                    <CardDescription>
                      A collection of my all-time favorite movies.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {playlist.movies.map((movie: Movie) => {
                        console.log(movie);
                        return <li key={movie.imdbID}>{movie.title}</li>;
                      })}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-end space-x-2">
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
                        {deleted ? "...." : "Delete"}
                      </Button>{" "}
                      <Link
                        href={`/dashboard/${playlist.id}`}
                        className={buttonVariants()}
                      >
                        View
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          <div className="mt-8">
            <CreatePlaylistNew />{" "}
          </div>
        </div>
      </main>
    </div>
  );
}
