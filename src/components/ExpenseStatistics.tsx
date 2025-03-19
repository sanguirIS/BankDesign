"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type ExpenseCategory = {
  name: string;
  percentage: number;
  color: string;
};

const expenseData: ExpenseCategory[] = [
  { name: "Investment", percentage: 30, color: "bg-blue-800" },
  { name: "Entertainment", percentage: 25, color: "bg-pink-500" },
  { name: "Bills", percentage: 15, color: "bg-blue-500" },
  { name: "Other", percentage: 30, color: "bg-cyan-400" },
];

export function ExpenseStatistics() {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <Card className="w-full dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium dark:text-white">Expense Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6">
          <div className={`${isMobile ? 'w-[120px] h-[120px]' : 'w-[160px] h-[160px]'} relative`}>
            {/* Custom SVG Donut Chart */}
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {expenseData.reduce(
                (acc, item, i) => {
                  const startAngle = acc.angle;
                  const angle = (item.percentage / 100) * 360;
                  const endAngle = startAngle + angle;

                  const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                  const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                  const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                  const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);

                  const largeArcFlag = angle > 180 ? 1 : 0;

                  acc.paths.push(
                    <path
                      key={i}
                      d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      className={item.color}
                    />
                  );

                  acc.angle = endAngle;
                  return acc;
                },
                { paths: [] as React.ReactNode[], angle: 0 }
              ).paths}
              <circle cx="50" cy="50" r="25" fill="white" className="dark:fill-gray-800" />
            </svg>
          </div>

          <div className="space-y-2 flex-1 sm:ml-4">
            {expenseData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                <div className="flex-1 flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
                  <span className="text-sm font-medium dark:text-gray-300">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
