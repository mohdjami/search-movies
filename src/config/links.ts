import { Navigation } from "@/types";

export const navLinks: Navigation = {
  data: [
    {
      title: "Home",
      href: "/",
    },

    {
      title: "Featured",
      href: "/#features",
    },
  ],
};

export const dashboardLinks: Navigation = {
  data: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
    },

    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
};
