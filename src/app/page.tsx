// import User from "@/components/User";
import Hero from "@/components/Hero";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return <Hero />;
}
