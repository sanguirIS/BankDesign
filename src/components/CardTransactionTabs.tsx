"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankCard } from "./BankCard";
import { RecentTransactions } from "./RecentTransactions";

export function CardTransactionTabs() {
  return (
    <Tabs defaultValue="cards" className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
        <TabsList className="w-full sm:w-auto dark:bg-gray-800">
          <TabsTrigger value="cards" className="flex-1 sm:flex-initial dark:text-gray-300 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">My Cards</TabsTrigger>
          <TabsTrigger value="transactions" className="flex-1 sm:flex-initial dark:text-gray-300 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">Recent Transaction</TabsTrigger>
        </TabsList>
        <button className="text-xs text-blue-600 font-medium hidden sm:block dark:text-blue-400">See All</button>
      </div>

      <TabsContent value="cards" className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BankCard
            cardType="visa"
            amount="5,756"
            cardHolder="Eddy Cusuma"
            cardNumber="1234"
            expiry="12/22"
            colorScheme="blue"
          />
          <BankCard
            cardType="mastercard"
            amount="5,756"
            cardHolder="Eddy Cusuma"
            cardNumber="1234"
            expiry="12/22"
            colorScheme="dark"
          />
        </div>
      </TabsContent>

      <TabsContent value="transactions">
        <RecentTransactions />
      </TabsContent>
    </Tabs>
  );
}
