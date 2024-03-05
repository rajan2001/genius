"use client";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import Link from "next/link";

const DynamicAnimation = dynamic(() => import("../../components/animation"), {
  ssr: false,
});

const LandingPage = () => {
  return (
    <div className="flex  flex-col-reverse">
      <div className="flex justify-center gap-6">
        <Link href="/sign-in">
          <Button>Login</Button>
        </Link>
        <Link href="/sign-up">
          <Button>Register</Button>
        </Link>
      </div>
      <div className="p-0">
        <DynamicAnimation />
      </div>
    </div>
  );
};

export default LandingPage;
