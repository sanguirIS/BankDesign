"use client";

import React from "react";
import Link from "next/link";
import { ArrowDownLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { transactions } from "@/data/transactionData";

export function RecentTransactions() {
  // Display only the 3 most recent transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 3);

  return (
    <Card className="w-full dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium dark:text-white">Recent Transactions</CardTitle>
        <Link href="/transactions">
          <Button variant="link" className="text-xs text-blue-600 font-medium dark:text-blue-400 px-0">
            See All
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 sm:space-y-5">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <Avatar className={`h-8 w-8 sm:h-10 sm:w-10 ${
                  transaction.type === "deposit"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    : transaction.category === "Transfer"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                }`}>
                  {transaction.icon ? (
                    <AvatarImage src={transaction.icon} alt={transaction.name} />
                  ) : (
                    <AvatarFallback className="text-xs sm:text-sm">{transaction.initials}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="text-xs sm:text-sm font-medium truncate max-w-[140px] sm:max-w-none dark:text-white">{transaction.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                {transaction.type === "deposit" ? (
                  <ArrowDownLeft className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                ) : (
                  <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                )}
                <span className={`text-xs sm:text-sm font-medium ${
                  transaction.type === "deposit" ? "text-green-500" : "text-red-500"
                }`}>
                  ${transaction.formattedAmount}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t dark:border-gray-700">
          <Link href="/transactions">
            <Button variant="outline" className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 flex items-center justify-center gap-1">
              View All Transactions
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
