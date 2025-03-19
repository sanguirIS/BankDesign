"use client";

import React, { useState, useMemo } from "react";
import { ArrowDownLeft, ArrowUpRight, ChevronDown, Search, ArrowUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  type Transaction,
  transactions as allTransactions,
  transactionCategories
} from "@/data/transactionData";
import { TransactionDetails } from "./TransactionDetails";

type SortOrder = "asc" | "desc";
type SortKey = "date" | "amount" | "name";

export function TransactionList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [transactionType, setTransactionType] = useState<"all" | "deposit" | "withdrawal">("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    return allTransactions
      .filter(transaction => {
        // Filter by search query
        const matchesSearch = transaction.name.toLowerCase().includes(searchQuery.toLowerCase());

        // Filter by categories
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(transaction.category);

        // Filter by transaction type
        const matchesType = transactionType === "all" || transaction.type === transactionType;

        return matchesSearch && matchesCategory && matchesType;
      })
      .sort((a, b) => {
        // Sort by the selected key
        if (sortKey === "date") {
          return sortOrder === "asc" ? a.timestamp - b.timestamp : b.timestamp - a.timestamp;
        } else if (sortKey === "amount") {
          return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
        } else {
          return sortOrder === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
      });
  }, [searchQuery, selectedCategories, transactionType, sortKey, sortOrder]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      // Toggle order if same key
      setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      // Set new key and default to ascending
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const viewTransactionDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowDetails(true);
  };

  const closeTransactionDetails = () => {
    setShowDetails(false);
  };

  return (
    <div className="space-y-4">
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-3 items-start">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-9 w-full dark:bg-gray-800 dark:text-gray-300"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9 dark:bg-gray-800 dark:border-gray-700">
                Type
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
              <DropdownMenuItem onClick={() => setTransactionType("all")} className={transactionType === "all" ? "bg-gray-100 dark:bg-gray-700" : ""}>
                All Transactions
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTransactionType("deposit")} className={transactionType === "deposit" ? "bg-gray-100 dark:bg-gray-700" : ""}>
                Deposits Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTransactionType("withdrawal")} className={transactionType === "withdrawal" ? "bg-gray-100 dark:bg-gray-700" : ""}>
                Withdrawals Only
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9 dark:bg-gray-800 dark:border-gray-700">
                Category
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
              {transactionCategories.map(category => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={selectedCategories.includes(category) ? "bg-gray-100 dark:bg-gray-700" : ""}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9 dark:bg-gray-800 dark:border-gray-700">
                Sort
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
              <DropdownMenuItem onClick={() => toggleSort("date")}>
                Date {sortKey === "date" && (sortOrder === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleSort("amount")}>
                Amount {sortKey === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleSort("name")}>
                Name {sortKey === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedCategories.length > 0 || transactionType !== "all" || searchQuery) && (
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map(category => (
            <Badge
              key={category}
              variant="secondary"
              className="dark:bg-gray-700 dark:text-gray-200 cursor-pointer"
              onClick={() => toggleCategory(category)}
            >
              {category} ×
            </Badge>
          ))}

          {transactionType !== "all" && (
            <Badge
              variant="secondary"
              className={`dark:bg-gray-700 dark:text-gray-200 cursor-pointer ${
                transactionType === "deposit" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
              onClick={() => setTransactionType("all")}
            >
              {transactionType === "deposit" ? "Deposits" : "Withdrawals"} ×
            </Badge>
          )}

          {searchQuery && (
            <Badge
              variant="secondary"
              className="dark:bg-gray-700 dark:text-gray-200 cursor-pointer"
              onClick={() => setSearchQuery("")}
            >
              Search: {searchQuery} ×
            </Badge>
          )}
        </div>
      )}

      {/* Transaction List */}
      <div className="space-y-4">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No transactions match your filters
          </div>
        ) : (
          filteredTransactions.map(transaction => (
            <div
              key={transaction.id}
              onClick={() => viewTransactionDetails(transaction)}
              className="cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]"
            >
              <TransactionItem transaction={transaction} />
            </div>
          ))
        )}
      </div>

      {/* Transaction Details Dialog */}
      <TransactionDetails
        transaction={selectedTransaction}
        open={showDetails}
        onClose={closeTransactionDetails}
      />
    </div>
  );
}

function TransactionItem({ transaction }: { transaction: Transaction }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-none dark:border dark:border-gray-700">
      <div className="flex items-center gap-3">
        <Avatar className={`h-10 w-10 ${
          transaction.type === "deposit"
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
            : transaction.category === "Transfer"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
        }`}>
          {transaction.icon ? (
            <AvatarImage src={transaction.icon} alt={transaction.name} />
          ) : (
            <AvatarFallback>{transaction.initials}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <p className="text-sm font-medium dark:text-white">{transaction.name}</p>
          <div className="flex items-center gap-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.date}</p>
            <Badge variant="outline" className="text-xs py-0 h-5 dark:border-gray-600 dark:text-gray-300">
              {transaction.category}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-right">
        {transaction.type === "deposit" ? (
          <ArrowDownLeft className="h-4 w-4 text-green-500" />
        ) : (
          <ArrowUpRight className="h-4 w-4 text-red-500" />
        )}
        <span className={`font-medium ${
          transaction.type === "deposit" ? "text-green-500" : "text-red-500"
        }`}>
          ${transaction.formattedAmount}
        </span>
      </div>
    </div>
  );
}
