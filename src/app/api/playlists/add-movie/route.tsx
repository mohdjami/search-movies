import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { handleError } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const user = await getCurrentUser();
    const { movie, playlist } = await req.json();
    //   console.log(movie, playlist);
    const playList = await db.playlist.findFirst({
      where: { name: playlist, ownerId: user?.id },
    });
    const movieExist = await db.movie.findFirst({
      where: {
        title: movie.Title,
        playlistId: playList?.id,
      },
    });
    console.log(movieExist);
    if (movieExist) {
      return NextResponse.json(
        {
          message: "Movie already exist in this playlist",
        },
        {
          status: 409,
        }
      );
    }
    const addMovie = await db.movie.create({
      data: {
        title: movie.Title,
        year: +movie.Year,
        poster: movie.Poster,
        type: movie.Type,
        playlist: {
          connect: {
            id: playList?.id,
          },
        },
      },
    });
    //   console.log(addMovie);
    return NextResponse.json({
      message: "success",
    });
  } catch (error) {
    console.log(error);
    await handleError((error as Error).message);
  }
}
