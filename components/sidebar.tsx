"use client"

import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  TreePine,
  TreesIcon,
  VideoIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    icons: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Seeds",
    icons: TreePine,
    href: "/conversation",
    color: "text-violet-500",
  },
  // {
  //   label: "Image Generation",
  //   icons: ImageIcon,
  //   href: "/image",
  //   color: "text-pink-500",
  // },
  // {
  //   label: "Video Generation",
  //   icons: VideoIcon,
  //   href: "/video",
  //   color: "text-orange-500",
  // },
  // {
  //   label: "Music Generation",
  //   icons: Music,
  //   href: "/music",
  //   color: "text-emerald-500",
  // },
  // {
  //   label: "Code Generation",
  //   icons: Code,
  //   href: "/code",
  //   color: "text-green-500",
  // },
  // {
  //   label: "Settings",
  //   icons: Settings,
  //   href: "/settings",
  //   color: "text-white",
  // },
];




const SideBar = () => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex-col justify-around h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href={"/dashboard"} className="flex items-center pl-3 mb-14">
          <div className="h-10 w-10 mr-4 relative bg-green-600 rounded-lg">
            <div className="flex justify-center items-center h-full">

            <TreesIcon className="h-6 w-8"/>
            </div>
          </div>
          <h1 className={cn("text-2xl font-bold text-green-600", montserrat.className)}>
            Seed.AI
          </h1>
        </Link>

        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm flex p-3 w-full justify-start rounded-lg cursor-pointer hover:text-white hover:bg-white/10 transition"
              , pathname === route.href ? "bg-white/10 text-white" : "")}>
              <div className="flex items-center flex-1">
                <route.icons className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>


      
    </div>
  );
};

export default SideBar;
