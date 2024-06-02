import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { movie, playlist } = await req.json();
  //   console.log(movie, playlist);
  const playList = await db.playlist.findUnique({
    where: { name: playlist },
  });
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
}
