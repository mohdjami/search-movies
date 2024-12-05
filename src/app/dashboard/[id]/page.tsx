import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import AddPlaylistDrawer from "@/components/add-playlist-drawer";
import Image from "next/image";
import { ImageFrame } from "@/components/image-frame";
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
export const dynamic = "force-dynamic";

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
  const owner = await db.user.findUnique({
    where: {
      id: playlist?.ownerId,
    },
  });
  const movies = playlist?.movies;
  const user = await getCurrentUser();

  if (user || playlist?.visibility) {
    if (user?.id !== playlist?.ownerId) {
      return redirect("/dashboard");
    }
  }
  return (
    <main>
      <CardHeader className="" key={playlist?.id}>
        <CardTitle>Playlist Name: {playlist?.name}</CardTitle>
        <CardTitle>Owner: {owner?.name}</CardTitle>
        <CardDescription>{playlist?.description}</CardDescription>
        <CardDescription>
          {playlist?.visibility ? "Private Playlist" : "Public Playlist"}
        </CardDescription>
      </CardHeader>
      {movies ? (
        <div className="grid lg:grid-cols-4 gap-5">
          {movies.map(
            (movie: {
              id: string;
              title: string;
              type: string | null;
              year: number | null;
              poster: string | null;
              createdAt: Date;
              updatedAt: Date;
              playlistId: string | null;
            }) => (
              <Card className="grid p-5" key={movie.id}>
                <CardTitle
                  key={movie.id}
                  className="flex text-lg py-3 truncate items-center justify-between"
                  title={movie.title}
                >
                  {movie.title}{" "}
                </CardTitle>
                <CardDescription className="py-2">{movie.year}</CardDescription>
                <CardDescription className="flex items-center justify-center py-2">
                  <ImageFrame>
                    {movie.poster !== "N/A" ? (
                      <Image
                        src={movie.poster || "/"}
                        alt={movie.title}
                        width={100}
                        height={100}
                      />
                    ) : null}
                  </ImageFrame>
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
