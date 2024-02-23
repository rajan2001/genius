"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "./sidebar";
import { useEffect, useState } from "react";

function MobileSideBar() {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // for hydration purpose

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0">
        <SideBar />
      </SheetContent>
    </Sheet>
  );
}

export default MobileSideBar;
