import { Metadata } from "next";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { Shell } from "@/components/shell";
import { DashboardHeader } from "@/components/dashboard-header";
import { UserNameForm } from "@/lib/user-name-form";
import { AppearanceForm } from "@/components/appearance-form";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage account and app settings.",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/signin");
  }

  return (
    <Shell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and app settings."
      />
      <div className="grid grid-cols-1 gap-6">
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
        <AppearanceForm />
      </div>
    </Shell>
  );
}
