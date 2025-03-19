"use client";

import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { MobileSidebar } from "./MobileSidebar";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationsDropdown } from "./NotificationsDropdown";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-center gap-2">
        <MobileSidebar />
        <h1 className="text-2xl font-semibold dark:text-white">Overview</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative w-64 hidden sm:block">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <Input
            type="search"
            placeholder="Search for something"
            className="pl-8 h-9 bg-gray-50 border-none rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:placeholder:text-gray-500"
          />
        </div>

        <ThemeToggle />

        <NotificationsDropdown />

        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
