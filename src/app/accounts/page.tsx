"use client";

import React from "react";
import Link from "next/link";
import {
  Home as HomeIcon,
  PiggyBank,
  TrendingUp,
  CreditCard,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { accounts } from "@/data/accountsData";

export default function AccountsPage() {
  // Icon mapping for account types
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "bank":
        return <HomeIcon className="h-5 w-5" />;
      case "piggy-bank":
        return <PiggyBank className="h-5 w-5" />;
      case "trending-up":
        return <TrendingUp className="h-5 w-5" />;
      case "credit-card":
        return <CreditCard className="h-5 w-5" />;
      default:
        return <DollarSign className="h-5 w-5" />;
    }
  };

  // Color mapping for account types
  const getColorClass = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "green":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "purple":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "red":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <Header />

        <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold dark:text-white">My Accounts</h2>
              <Button className="hidden sm:flex">
                <PiggyBank className="h-4 w-4 mr-2" />
                Add New Account
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
              {accounts.map((account) => (
                <Link href={`/accounts/${account.id}`} key={account.id}>
                  <Card className="w-full h-full hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-2">
                            <div className={`mr-2 h-8 w-8 rounded-full flex items-center justify-center ${getColorClass(account.color)}`}>
                              {getIcon(account.icon)}
                            </div>
                            <div>
                              <h3 className="font-medium dark:text-white">{account.name}</h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{account.institution}</p>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                            Account Number: {account.accountNumber}
                          </p>
                          <div className="flex items-center">
                            {account.type === "credit" ? (
                              <ArrowUpRight className="h-4 w-4 text-red-500 mr-1" />
                            ) : (
                              <ArrowDownLeft className="h-4 w-4 text-green-500 mr-1" />
                            )}
                            <span className={`text-xl font-semibold ${
                              account.type === "credit" ? "text-red-500" : "text-green-600 dark:text-green-400"
                            }`}>
                              ${account.formattedBalance}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg font-medium dark:text-white">
                    Total Assets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Calculate total assets (excluding credit accounts) */}
                    <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                      <span className="text-gray-500 dark:text-gray-400">Total Balance</span>
                      <span className="font-semibold dark:text-white">
                        ${accounts
                            .filter(account => account.type !== "credit")
                            .reduce((sum, account) => sum + account.balance, 0)
                            .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    {/* Calculate total debt */}
                    <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                      <span className="text-gray-500 dark:text-gray-400">Total Debt</span>
                      <span className="font-semibold text-red-500">
                        ${Math.abs(accounts
                            .filter(account => account.type === "credit")
                            .reduce((sum, account) => sum + account.balance, 0))
                            .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    {/* Calculate net worth */}
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-500 dark:text-gray-400">Net Worth</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        ${accounts
                            .reduce((sum, account) => sum + account.balance, 0)
                            .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
