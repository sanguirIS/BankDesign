"use client";

import React from "react";
import { ArrowDownLeft, ArrowUpRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Transaction } from "@/data/transactionData";

interface TransactionDetailsProps {
  transaction: Transaction | null;
  open: boolean;
  onClose: () => void;
}

export function TransactionDetails({ transaction, open, onClose }: TransactionDetailsProps) {
  if (!transaction) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 dark:border-gray-700">
        <DialogHeader className="flex flex-row items-center justify-between pb-2">
          <DialogTitle className="text-lg font-medium dark:text-white">
            Transaction Details
          </DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="pt-4 space-y-6">
          {/* Transaction Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className={`h-12 w-12 ${
                transaction.type === "deposit"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  : transaction.category === "Transfer"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              }`}>
                {transaction.icon ? (
                  <AvatarImage src={transaction.icon} alt={transaction.name} />
                ) : (
                  <AvatarFallback className="font-medium">{transaction.initials}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="font-medium dark:text-white">{transaction.name}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs py-0 h-5 dark:border-gray-600 dark:text-gray-300">
                    {transaction.category}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Amount */}
          <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
            <div className="flex items-center gap-2">
              {transaction.type === "deposit" ? (
                <ArrowDownLeft className="h-5 w-5 text-green-500" />
              ) : (
                <ArrowUpRight className="h-5 w-5 text-red-500" />
              )}
              <span className={`text-xl md:text-2xl font-semibold ${
                transaction.type === "deposit" ? "text-green-500" : "text-red-500"
              }`}>
                ${transaction.formattedAmount}
              </span>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-3">
            <DetailRow label="Transaction ID" value={transaction.id} />
            <DetailRow label="Date" value={transaction.date} />
            <DetailRow
              label="Type"
              value={transaction.type === "deposit" ? "Deposit" : "Withdrawal"}
              valueClassName={
                transaction.type === "deposit"
                  ? "text-green-500"
                  : "text-red-500"
              }
            />
            <DetailRow label="Category" value={transaction.category} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface DetailRowProps {
  label: string;
  value: string;
  valueClassName?: string;
}

function DetailRow({ label, value, valueClassName = "" }: DetailRowProps) {
  return (
    <div className="flex justify-between">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className={`text-sm font-medium dark:text-white ${valueClassName}`}>
        {value}
      </span>
    </div>
  );
}
