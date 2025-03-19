"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[280px] max-w-full">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-800 dark:bg-gray-900">
          <div className="font-bold text-xl dark:text-white">BankDash.</div>
          <button onClick={() => setOpen(false)} className="text-gray-500 dark:text-gray-400">
            <X className="h-5 w-5" />
          </button>
        </div>
        <Sidebar isMobile={true} />
      </SheetContent>
    </Sheet>
  );
}
