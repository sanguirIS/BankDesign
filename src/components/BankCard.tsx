"use client";

import { CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";

interface BankCardProps {
  cardType: "visa" | "mastercard";
  amount: string;
  cardHolder: string;
  cardNumber: string;
  expiry: string;
  colorScheme?: "blue" | "dark";
}

export function BankCard({
  cardType = "visa",
  amount,
  cardHolder,
  cardNumber,
  expiry,
  colorScheme = "blue"
}: BankCardProps) {
  const { theme } = useTheme();

  // Default color schemes
  let bgGradient = "bg-gradient-to-r from-blue-600 to-blue-500";

  // Override based on colorScheme prop and theme
  if (colorScheme === "dark") {
    bgGradient = "bg-gradient-to-r from-gray-800 to-gray-700";
  } else if (theme === "dark") {
    // For dark theme, use a more vibrant blue in dark mode
    bgGradient = "bg-gradient-to-r from-blue-700 to-blue-600";
  }

  return (
    <Card className={`w-full relative overflow-hidden ${bgGradient} text-white p-4 sm:p-5 rounded-xl`}>
      <div className="flex justify-between items-start mb-4 sm:mb-6">
        <div>
          <p className="text-xs sm:text-sm opacity-80">Balance</p>
          <h3 className="text-xl sm:text-2xl font-bold">${amount}</h3>
        </div>
        {cardType === "visa" ? (
          <div className="h-6 w-10 sm:h-8 sm:w-12 bg-white rounded flex items-center justify-center">
            <div className="text-blue-600 font-bold text-[10px] sm:text-xs">VISA</div>
          </div>
        ) : (
          <div className="h-8 w-8 sm:h-10 sm:w-10 bg-white rounded-full flex items-center justify-center">
            <div className="flex items-center">
              <div className="h-4 w-4 sm:h-5 sm:w-5 bg-red-500 rounded-full opacity-70 -mr-2"></div>
              <div className="h-4 w-4 sm:h-5 sm:w-5 bg-yellow-500 rounded-full opacity-70"></div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-4 sm:mb-6">
        <p className="text-xs sm:text-sm opacity-80">Card Holder</p>
        <p className="text-sm sm:font-medium">{cardHolder}</p>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-base sm:text-xl font-mono tracking-widest">
            •••• •••• •••• {cardNumber.slice(-4)}
          </p>
        </div>
        <div>
          <p className="text-xs sm:text-sm opacity-80">Expires</p>
          <p className="text-sm sm:font-medium">{expiry}</p>
        </div>
      </div>
    </Card>
  );
}
