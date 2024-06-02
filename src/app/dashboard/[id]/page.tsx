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
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import AddPlaylistDrawer from "@/components/add-playlist-drawer";
import Image from "next/image";
type Props = {
  params: { id: string };
};

export type Movie = {
  id: string;
  title: string;
  type: string | null;
  year: number;
  poster: string;
  createdAt: Date;
  updatedAt: Date;
  playlistId: string | null;
};

const PlaylistPage = async ({ params }: Props) => {
  //   const id = searchParams.get("id");
  const id = params.id;
  const playlist = await db.playlist.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,

      movies: true,
      ownerId: true,
      description: true,
      visibility: true,
    },
  });
  const movies = playlist?.movies;
  // This will not be logged on the server when using static rendering
  console.log(id);
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/sign-in");
  }
  if (playlist?.visibility === true) {
    if (user.id !== playlist.ownerId) {
      return redirect("/dashboard");
    }
  }
  return (
    <main className="mt-32">
      <CardHeader className="p-10 " key={playlist?.id}>
        <CardTitle>{playlist?.name}</CardTitle>
        <CardDescription>{playlist?.description}</CardDescription>
      </CardHeader>
      {movies ? (
        <div className="grid grid-cols-4 gap-5 m-10">
          {movies.map(
            (movie: {
              id: string;
              title: string;
              type: string | null;
              year: number;
              poster: string;
              createdAt: Date;
              updatedAt: Date;
              playlistId: string | null;
            }) => (
              <Card className="grid p-5 space-y-5" key={movie.id}>
                <CardTitle
                  key={movie.id}
                  className="flex text-lg py-3 truncate items-center justify-between"
                  title={movie.title}
                >
                  {movie.title}{" "}
                </CardTitle>
                <CardDescription className="py-2">{movie.year}</CardDescription>
                <CardDescription className="flex items-center justify-center p-4">
                  {movie.poster !== "N/A" ? (
                    <Image
                      src={movie.poster}
                      alt={movie.title}
                      width={200}
                      height={200}
                    />
                  ) : null}
                </CardDescription>
                <CardFooter className="flex justify-between">
                  {movie.type}
                </CardFooter>
              </Card>
            )
          )}
        </div>
      ) : null}
    </main>
  );
};

export default PlaylistPage;
