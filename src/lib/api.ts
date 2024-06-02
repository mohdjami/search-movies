import { Movie } from "@/types/config";
import { db } from "./db";
import { getCurrentUser } from "./session";

export async function CreatePlaylist(
  name: string,
  description: string,
  privatePlaylist: boolean | undefined,
  movie: Movie
) {
  const response = await fetch("api/playlists/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      privatePlaylist,
      movie,
    }),
  });

  console.log(response);
}
