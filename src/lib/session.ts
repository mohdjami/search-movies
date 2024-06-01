import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { db } from "./db";

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
    });
    return user;
  } else return null;
};
