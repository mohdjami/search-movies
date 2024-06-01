import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { privateEncrypt } from "crypto";
import { User } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  const { name, description, privatePlaylist, movie } = await req.json();
  console.log(name, description, privatePlaylist, movie);
  // const playlist = await db.playlist.create({
  //   data: {
  //     name,
  //     description,
  //     visibility: privatePlaylist,
  //     ownerId: user?.id!,
  //     movies: {
  //       create: {
  //         title: movie.Title,
  //         type: description,
  //         year: 2000,
  //         poster: "something",
  //       },
  //     },
  //   },
  // });
  // console.log(playlist);
  return NextResponse.json({
    // playlist,
    message: "Playlist created successfully",
  });
}
