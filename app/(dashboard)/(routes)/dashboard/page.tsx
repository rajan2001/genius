"use client";

import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Code,
  Image,
  MessageSquare,
  Music,
  TreePine,
  Trees,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const tools = [
  {
    label: "Seeds",
    icon: TreePine,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
  // {
  //   label: "Image Generation",
  //   icon: Image,
  //   color: "text-pink-700",
  //   bgColor: "bg-pink-700/10",
  //   href: "/image",
  // },
  // {
  //   label: "Video Generation",
  //   icon: Video,
  //   color: "text-orange-500",
  //   bgColor: "bg-orange-700/10",
  //   href: "/video",
  // },
  // {
  //   label: "Music Generation",
  //   icon: Music,
  //   color: "text-emerald-500",
  //   bgColor: "bg-emerald-700/10",
  //   href: "/music",
  // },
  // {
  //   label: "Code Generation",
  //   icon: Code,
  //   color: "text-green-500",
  //   bgColor: "bg-green-700/10",
  //   href: "/code",
  // },
];

const DynamicAnimation = dynamic(
  () => import("../../../../components/animation"),
  {
    ssr: false,
  }
);

const DashBoardPage = () => {
  const route = useRouter();
  return (
    <div className="flex flex-col justify-between items-center">
      <div>
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center">Seeds</h2>
          <p className="text-sm md:text-lg text-slate-500 text-center">
            A Smart App for Farmers
          </p>
        </div>
        {/* <div className="px-4 md:px-20 lg:px-32 space-y-4">
          {tools.map((tool) => (
            <Card
              onClick={() => route.push(tool.href)}
              key={tool.href}
              className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 rounded-md w-fit", tool.bgColor)}>
                  <tool.icon className={cn("w-8 h-8", tool.color)} />
                </div>
                <div className=" font-semibold ">{tool.label}</div>
              </div>
              <ArrowRight className="h-5 w-5" />
            </Card>
          ))}
        </div> */}
      </div>
      <div className="w-auto h-full overflow-hidden">
        <DynamicAnimation />
      </div>
    </div>
  );
};

export default DashBoardPage;
