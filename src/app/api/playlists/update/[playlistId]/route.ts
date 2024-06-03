import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { userNameSchema } from "@/lib/validations/user";
import { NextRequest, NextResponse } from "next/server";

const routeContextSchema = z.object({
  params: z.object({
    playlistId: z.string(),
  }),
});

export async function PATCH(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    const session = await getServerSession(authOptions);

    if (!session?.user || params.playlistId !== session?.user.id) {
      return new Response(null, { status: 403 });
    }

    const { name } = await req.json();

    await db.user.update({
      where: {
        id: params.playlistId,
      },
      data: {
        name: name,
        updatedAt: new Date(),
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json({
      error: "Something went wrong",
    });
  }
}
