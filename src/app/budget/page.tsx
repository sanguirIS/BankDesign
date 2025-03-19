"use client";

import React from "react";
import {
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  Calendar
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { budgetCategories, monthlyBudget } from "@/data/budgetData";
import { BudgetTracker } from "@/components/BudgetTracker";

export default function BudgetPage() {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <Header />

        <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold dark:text-white">Budget Overview</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Track your monthly spending and manage your budget
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="h-9 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                  <Calendar className="h-4 w-4 mr-2" />
                  {monthlyBudget.month}
                </Button>
                <Button variant="outline" className="h-9 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Budget Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex flex-col">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Total Budget</span>
                    <span className="text-2xl font-semibold mt-1 dark:text-white">
                      ${monthlyBudget.totalAllocated.toLocaleString()}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      for {monthlyBudget.month} {monthlyBudget.year}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex flex-col">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Total Spent</span>
                    <span className="text-2xl font-semibold mt-1 dark:text-white">
                      ${monthlyBudget.totalSpent.toLocaleString()}
                    </span>
                    <div className="flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 text-red-500 mr-1" />
                      <span className="text-red-500 text-xs">
                        {Math.round((monthlyBudget.totalSpent / monthlyBudget.totalAllocated) * 100)}% of budget
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex flex-col">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Remaining</span>
                    <span className={`text-2xl font-semibold mt-1 ${
                      monthlyBudget.totalAllocated - monthlyBudget.totalSpent > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}>
                      ${Math.abs(monthlyBudget.totalAllocated - monthlyBudget.totalSpent).toLocaleString()}
                    </span>
                    <div className="flex items-center mt-1">
                      {monthlyBudget.totalAllocated - monthlyBudget.totalSpent > 0 ? (
                        <>
                          <ArrowDownLeft className="h-3 w-3 text-green-500 mr-1" />
                          <span className="text-green-500 text-xs">
                            Under budget
                          </span>
                        </>
                      ) : (
                        <>
                          <ArrowUpRight className="h-3 w-3 text-red-500 mr-1" />
                          <span className="text-red-500 text-xs">
                            Over budget
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Budget Tracker and Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BudgetTracker />

              <Card className="w-full dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg font-medium dark:text-white">
                    Spending Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-center">
                    <div className="relative h-60 w-60">
                      <BudgetPieChart />
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-2">
                    {budgetCategories.slice(0, 6).map(category => {
                      const percentage = Math.round((category.spent / monthlyBudget.totalSpent) * 100);
                      return (
                        <div key={category.id} className="flex items-center gap-2">
                          <div
                            className={`h-3 w-3 rounded-full`}
                            style={{
                              backgroundColor:
                                category.color === "blue" ? "#3b82f6" :
                                category.color === "green" ? "#10b981" :
                                category.color === "purple" ? "#8b5cf6" :
                                category.color === "pink" ? "#ec4899" :
                                category.color === "red" ? "#ef4444" :
                                category.color === "yellow" ? "#f59e0b" :
                                category.color === "teal" ? "#14b8a6" :
                                category.color === "orange" ? "#f97316" : "#6b7280"
                            }}
                          ></div>
                          <div className="text-xs dark:text-gray-300 flex-1">{category.name}</div>
                          <div className="text-xs font-medium dark:text-white">{percentage}%</div>
                        </div>
                      );
                    })}
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

function BudgetPieChart() {
  const totalSpent = monthlyBudget.totalSpent;

  // Calculate angles for each category
  let currentAngle = 0;
  const segments = budgetCategories.map(category => {
    const percentage = (category.spent / totalSpent);
    const startAngle = currentAngle;
    const angle = percentage * 360;
    currentAngle += angle;
    const endAngle = currentAngle;

    return {
      ...category,
      percentage,
      startAngle,
      endAngle
    };
  });

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
      {segments.map((segment, index) => {
        // Convert angles to radians
        const startAngle = (segment.startAngle * Math.PI) / 180;
        const endAngle = (segment.endAngle * Math.PI) / 180;

        // Calculate the SVG arc path
        const x1 = 50 + 40 * Math.cos(startAngle);
        const y1 = 50 + 40 * Math.sin(startAngle);
        const x2 = 50 + 40 * Math.cos(endAngle);
        const y2 = 50 + 40 * Math.sin(endAngle);

        // Determine if the arc should take the long path (> 180 degrees)
        const largeArcFlag = segment.endAngle - segment.startAngle > 180 ? 1 : 0;

        // The path for the segment
        const path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

        // Get color based on category
        const getColor = () => {
          switch (segment.color) {
            case "blue": return "#3b82f6";
            case "green": return "#10b981";
            case "purple": return "#8b5cf6";
            case "pink": return "#ec4899";
            case "red": return "#ef4444";
            case "yellow": return "#f59e0b";
            case "teal": return "#14b8a6";
            case "orange": return "#f97316";
            default: return "#6b7280";
          }
        };

        return (
          <path
            key={segment.id}
            d={path}
            fill={getColor()}
            stroke="white"
            strokeWidth="1"
            className="dark:stroke-gray-800"
          />
        );
      })}
      <circle cx="50" cy="50" r="25" fill="white" className="dark:fill-gray-800" />
    </svg>
  );
}
