import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

async function GetAllPlaylists() {
  const user = await getCurrentUser();
  const playlists = db.playlist.findMany({
    where: { ownerId: user?.id },
    select: {
      id: true,
      name: true,
      ownerId: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      movies: true,
    },
  });

  return playlists;
}

export async function GET(req: NextRequest, res: NextResponse) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({
      error: "You must be logged in to view your playlists",
    });
  }
  const playlists = await GetAllPlaylists();
  return NextResponse.json({
    playlists,
  });
}
