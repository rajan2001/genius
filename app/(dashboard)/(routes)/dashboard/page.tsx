"use client";

import { TreePine } from "lucide-react";
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
      </div>
      <div className="w-auto h-full overflow-hidden">
        <DynamicAnimation />
      </div>
    </div>
  );
};

export default DashBoardPage;
