import React from "react";
import Hero from "@/components/Hero";
import Home from "@/components/Home";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <section className="container min-h-screen">
      <Home />
    </section>
  );
};

export default HomePage;
