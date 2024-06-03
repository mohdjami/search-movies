"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { Icons } from "@/components/Icons";
import { useState } from "react";

const UserAccountNav = () => {
  const [loading, isLoading] = useState(false);
  return (
    <Button
      onClick={() => {
        isLoading(true);
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        });
        isLoading(false);
      }}
      variant="destructive"
    >
      {loading ? "...." : "Sign Out"}
    </Button>
  );
};

export default UserAccountNav;
