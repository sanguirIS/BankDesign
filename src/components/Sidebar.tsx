"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CircleDollarSign,
  FileText,
  LayoutDashboard,
  CreditCard,
  PieChart,
  Settings,
  BarChart
} from "lucide-react";

interface SidebarProps {
  isMobile?: boolean;
}

export function Sidebar({ isMobile = false }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={`${isMobile ? 'h-full' : 'h-screen w-[220px] hidden md:flex'} flex-col bg-white dark:bg-gray-900 dark:border-gray-800 border-r`}>
      {!isMobile && (
        <div className="p-6 border-b dark:border-gray-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-blue-600 rounded-md h-7 w-7 flex items-center justify-center">
              <CircleDollarSign className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl dark:text-white">BankDash.</span>
          </Link>
        </div>
      )}

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <li>
            <Link
              href="/"
              className={`flex items-center gap-3 p-3 rounded-md ${
                pathname === "/"
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/transactions"
              className={`flex items-center gap-3 p-3 rounded-md ${
                pathname === "/transactions" || pathname.startsWith("/transactions/")
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <FileText className="h-5 w-5" />
              <span>Transactions</span>
            </Link>
          </li>
          <li>
            <Link
              href="/accounts"
              className={`flex items-center gap-3 p-3 rounded-md ${
                pathname === "/accounts" || pathname.startsWith("/accounts/")
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Accounts</span>
            </Link>
          </li>
          <li>
            <Link
              href="/budget"
              className={`flex items-center gap-3 p-3 rounded-md ${
                pathname === "/budget"
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <BarChart className="h-5 w-5" />
              <span>Budget</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center gap-3 p-3 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              <PieChart className="h-5 w-5" />
              <span>Investments</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center gap-3 p-3 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              <CreditCard className="h-5 w-5" />
              <span>Credit Cards</span>
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className={`flex items-center gap-3 p-3 rounded-md ${
                pathname === "/settings"
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
