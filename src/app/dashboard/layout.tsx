import { DashboardNav } from "@/components/dashboard-nav";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { dashboardLinks } from "@/config/links";
import { getCurrentUser } from "@/lib/session";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col space-y-2">
      <Navbar />
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] ">
        <aside className="hidden w-[200px] flex-col md:flex mt-32">
          <DashboardNav items={dashboardLinks.data} />
        </aside>
        <main className="flex w-full flex-1 flex-col mt-20">{children}</main>
      </div>
    </div>
  );
}
