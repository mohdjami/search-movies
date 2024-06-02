import Dashboard from "@/components/Dashboard";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default page;
