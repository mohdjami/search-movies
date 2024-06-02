import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { handleError } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

async function GetAllPlaylists() {
  const user = await getCurrentUser();
  const playlists = await db.playlist.findMany({
    where: { ownerId: user?.id },
    select: {
      id: true,
      name: true,
      ownerId: true,
      description: true,
      movies: true,
    },
  });
  console.log(
    playlists.map((playlist) => {
      console.log(playlist.movies);
    })
  );
  return playlists;
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const playlists = await GetAllPlaylists();
    return NextResponse.json({
      playlists,
    });
  } catch (error) {
    console.log(error);
    await handleError((error as Error).message);
  }
}
