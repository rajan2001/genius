"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TreesIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { Montserrat } from "next/font/google";
import Link from "next/link";

const DynamicAnimation = dynamic(() => import("../../components/animation"), {
  ssr: false,
});

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const LandingPage = () => {
  return (
    <div className="flex  flex-col-reverse justify-center items-center h-screen">
      <div className="flex justify-center gap-6">
        <Link href="/sign-in">
          <Button>Login</Button>
        </Link>
        <Link href="/sign-up">
          <Button>Register</Button>
        </Link>
      </div>
      <div className="w-[50%]">
        <DynamicAnimation />
      </div>

      <h1
        className={cn(
          "text-[5rem] font-bold text-black",
          montserrat.className
        )}>
        Seed.AI
      </h1>
    </div>
  );
};

export default LandingPage;
