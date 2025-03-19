"use client";

import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionList } from "@/components/TransactionList";

export default function TransactionsPage() {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <Header />

        <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold dark:text-white">Transactions</h2>
            </div>

            <Card className="w-full dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium dark:text-white">
                  Transaction History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionList />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
