import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  HomeIcon,
  PiggyBank,
  TrendingUp,
  CreditCard,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Share2,
  Wallet
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { accounts } from "@/data/accountsData";
import { transactions } from "@/data/transactionData";
import { AccountActivityChart } from "@/components/AccountActivityChart";

export function generateStaticParams() {
  return accounts.map(account => ({
    id: account.id,
  }));
}

export default function AccountDetailPage({ params }: { params: { id: string } }) {
  const account = accounts.find(acc => acc.id === params.id);

  // If account not found, show not found UI
  if (!account) {
    return (
      <div className="flex min-h-screen bg-white dark:bg-gray-950">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 md:p-6 flex items-center justify-center">
            <Card className="max-w-md mx-auto dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="pt-6 text-center">
                <div className="mb-4">
                  <div className="h-16 w-16 mx-auto rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 flex items-center justify-center">
                    <CreditCard className="h-8 w-8" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-2 dark:text-white">Account Not Found</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  The account you're looking for doesn't exist or has been removed.
                </p>
                <Link href="/accounts">
                  <Button>
                    Return to Accounts
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

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

  // Get recent transactions for this account
  const accountTransactions = transactions
    .slice(0, 5)
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <Header />

        <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Back button and header */}
            <div>
              <Link href="/accounts">
                <Button
                  variant="ghost"
                  className="mb-4 pl-0 hover:bg-transparent hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Accounts
                </Button>
              </Link>

              <div className="flex items-center gap-3 mb-6">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${getColorClass(account.color)}`}>
                  {getIcon(account.icon)}
                </div>
                <div>
                  <h1 className="text-2xl font-semibold dark:text-white">{account.name}</h1>
                  <p className="text-gray-500 dark:text-gray-400">{account.institution}</p>
                </div>
              </div>
            </div>

            {/* Account Overview */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-medium dark:text-white">
                  Account Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current Balance</div>
                    <div className="flex items-center">
                      {account.type === "credit" ? (
                        <ArrowUpRight className="h-5 w-5 text-red-500 mr-1" />
                      ) : (
                        <ArrowDownLeft className="h-5 w-5 text-green-500 mr-1" />
                      )}
                      <span className={`text-2xl font-semibold ${
                        account.type === "credit" ? "text-red-500" : "text-green-600 dark:text-green-400"
                      }`}>
                        ${account.formattedBalance}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Account Number</div>
                    <div className="text-base font-medium dark:text-white">{account.accountNumber}</div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Account Type</div>
                    <div className="flex items-center">
                      <Badge variant="outline" className="capitalize dark:border-gray-700 dark:text-white">
                        {account.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Activity Chart */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-medium dark:text-white">
                  Balance History
                </CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  Last 30 days activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <AccountActivityChart activity={account.activity} accountType={account.type} />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2 dark:bg-gray-800 dark:border-gray-700">
                <Share2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium">Transfer</span>
              </Button>

              <Button variant="outline" className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2 dark:bg-gray-800 dark:border-gray-700">
                <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium">Scheduled</span>
              </Button>

              <Button variant="outline" className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2 dark:bg-gray-800 dark:border-gray-700">
                <Wallet className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium">Deposit</span>
              </Button>

              <Button variant="outline" className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2 dark:bg-gray-800 dark:border-gray-700">
                <CreditCard className="h-5 w-5 text-red-600 dark:text-red-400" />
                <span className="text-sm font-medium">Pay Bill</span>
              </Button>
            </div>

            {/* Recent Transactions */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium dark:text-white">
                  Recent Transactions
                </CardTitle>
                <Link href="/transactions">
                  <Button variant="link" className="text-blue-600 dark:text-blue-400">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accountTransactions.map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          transaction.type === "deposit"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}>
                          {transaction.type === "deposit" ? (
                            <ArrowDownLeft className="h-5 w-5" />
                          ) : (
                            <ArrowUpRight className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium dark:text-white">{transaction.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.date}</p>
                        </div>
                      </div>
                      <span className={`font-medium ${
                        transaction.type === "deposit" ? "text-green-600 dark:text-green-400" : "text-red-500"
                      }`}>
                        ${transaction.formattedAmount}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
