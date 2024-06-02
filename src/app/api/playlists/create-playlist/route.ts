import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { handleError } from "@/lib/utils";
import { privateEncrypt } from "crypto";
import { User } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    const { name, description, privatePlaylist } = await req.json();
    console.log(name, description, privatePlaylist);
    const playlist = await db.playlist.create({
      data: {
        name,
        description,
        visibility: privatePlaylist,
        ownerId: user?.id!,
      },
    });
    console.log(playlist);
    return NextResponse.json({
      playlist,
      message: "Playlist created successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Something went wrong",
    });
  }
}
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const id = searchParams.get("id");
    const user = await getCurrentUser();
    if (!id) {
      await handleError("ID not found");
    }
    if (!user)
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    // console.log(id);
    const playlist = await db.playlist.delete({
      where: {
        id: id!,
      },
    });
    return NextResponse.json({
      message: "success",
    });
  } catch (error) {
    console.log(error);
    await handleError((error as Error).message);
  }
}
