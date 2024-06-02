import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

async function GetAllPlaylists() {
  const user = await getCurrentUser();
  const playlists = db.playlist.findMany({ where: { ownerId: user?.id } });
  return playlists;
}

export async function GET(req: NextRequest, res: NextResponse) {
  const playlists = await GetAllPlaylists();
  return NextResponse.json({
    playlists,
  });
}
