"use client";

import React from "react";
import {
  Home,
  Utensils,
  Car,
  Film,
  ShoppingBag,
  Zap,
  Activity,
  User,
  Plus,
  AlertCircle,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { budgetCategories, monthlyBudget } from "@/data/budgetData";

export function BudgetTracker() {
  // Get icon component based on string name
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "home":
        return <Home className="h-4 w-4" />;
      case "utensils":
        return <Utensils className="h-4 w-4" />;
      case "car":
        return <Car className="h-4 w-4" />;
      case "film":
        return <Film className="h-4 w-4" />;
      case "shopping-bag":
        return <ShoppingBag className="h-4 w-4" />;
      case "zap":
        return <Zap className="h-4 w-4" />;
      case "activity":
        return <Activity className="h-4 w-4" />;
      case "user":
        return <User className="h-4 w-4" />;
      default:
        return <Plus className="h-4 w-4" />;
    }
  };

  // Get color classes based on string name and percentage
  const getColorClasses = (colorName: string, percentage: number) => {
    // Base class for background
    let bgClass = "";
    let textClass = "";
    let fillClass = "";

    // Classes for background color
    switch (colorName) {
      case "blue":
        bgClass = "bg-blue-100 dark:bg-blue-900/30";
        textClass = "text-blue-700 dark:text-blue-300";
        fillClass = "bg-blue-600 dark:bg-blue-500";
        break;
      case "green":
        bgClass = "bg-green-100 dark:bg-green-900/30";
        textClass = "text-green-700 dark:text-green-300";
        fillClass = "bg-green-600 dark:bg-green-500";
        break;
      case "purple":
        bgClass = "bg-purple-100 dark:bg-purple-900/30";
        textClass = "text-purple-700 dark:text-purple-300";
        fillClass = "bg-purple-600 dark:bg-purple-500";
        break;
      case "pink":
        bgClass = "bg-pink-100 dark:bg-pink-900/30";
        textClass = "text-pink-700 dark:text-pink-300";
        fillClass = "bg-pink-600 dark:bg-pink-500";
        break;
      case "red":
        bgClass = "bg-red-100 dark:bg-red-900/30";
        textClass = "text-red-700 dark:text-red-300";
        fillClass = "bg-red-600 dark:bg-red-500";
        break;
      case "yellow":
        bgClass = "bg-yellow-100 dark:bg-yellow-900/30";
        textClass = "text-yellow-700 dark:text-yellow-300";
        fillClass = "bg-yellow-600 dark:bg-yellow-500";
        break;
      case "teal":
        bgClass = "bg-teal-100 dark:bg-teal-900/30";
        textClass = "text-teal-700 dark:text-teal-300";
        fillClass = "bg-teal-600 dark:bg-teal-500";
        break;
      case "orange":
        bgClass = "bg-orange-100 dark:bg-orange-900/30";
        textClass = "text-orange-700 dark:text-orange-300";
        fillClass = "bg-orange-600 dark:bg-orange-500";
        break;
      default:
        bgClass = "bg-gray-100 dark:bg-gray-800";
        textClass = "text-gray-700 dark:text-gray-300";
        fillClass = "bg-gray-600 dark:bg-gray-500";
    }

    // If over budget, use red for the progress bar
    if (percentage > 100) {
      fillClass = "bg-red-600 dark:bg-red-500";
    }

    return { bgClass, textClass, fillClass };
  };

  // Calculate overall budget percentage
  const overallPercentage = Math.round((monthlyBudget.totalSpent / monthlyBudget.totalAllocated) * 100);

  return (
    <Card className="w-full dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium dark:text-white">
          Budget Tracker ({monthlyBudget.month} {monthlyBudget.year})
        </CardTitle>
        <Button variant="outline" className="h-8 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
          <Plus className="h-3.5 w-3.5 mr-1" />
          Add Category
        </Button>
      </CardHeader>
      <CardContent>
        {/* Overall budget progress */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium dark:text-white">Overall Budget</span>
            <span className="text-sm font-medium dark:text-white">
              ${monthlyBudget.totalSpent.toLocaleString()} / ${monthlyBudget.totalAllocated.toLocaleString()}
            </span>
          </div>
          <div className="relative pt-1">
            <Progress
              value={overallPercentage > 100 ? 100 : overallPercentage}
              className="h-2"
            />
            <div className="flex items-center justify-between mt-1">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {overallPercentage}% used
              </div>
              {overallPercentage > 100 && (
                <div className="text-xs text-red-500 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Over budget by ${(monthlyBudget.totalSpent - monthlyBudget.totalAllocated).toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Budget categories */}
        <div className="space-y-4">
          {budgetCategories.map((category) => {
            const percentage = Math.round((category.spent / category.allocated) * 100);
            const { bgClass, textClass, fillClass } = getColorClasses(category.color, percentage);

            return (
              <div key={category.id} className="group cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className={`h-8 w-8 rounded-full ${bgClass} flex items-center justify-center mr-3`}>
                      <span className={textClass}>
                        {getIcon(category.icon)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium dark:text-white">{category.name}</h3>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        ${category.spent.toLocaleString()} of ${category.allocated.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                    <div
                      style={{ width: `${percentage > 100 ? 100 : percentage}%` }}
                      className={`${fillClass} rounded h-2 transition-all duration-500 ease-in-out`}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {percentage}% used
                    </div>
                    {percentage > 100 && (
                      <div className="text-xs text-red-500">
                        Over by ${(category.spent - category.allocated).toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
