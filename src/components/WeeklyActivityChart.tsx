"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type WeekData = {
  day: string;
  deposit: number;
  withdrawal: number;
};

const dummyData: WeekData[] = [
  { day: "Mon", deposit: 200, withdrawal: 100 },
  { day: "Tue", deposit: 300, withdrawal: 150 },
  { day: "Wed", deposit: 250, withdrawal: 120 },
  { day: "Thu", deposit: 400, withdrawal: 200 },
  { day: "Fri", deposit: 350, withdrawal: 180 },
  { day: "Sat", deposit: 450, withdrawal: 220 },
  { day: "Sun", deposit: 380, withdrawal: 190 },
];

export function WeeklyActivityChart() {
  const maxValue = Math.max(...dummyData.map(d => Math.max(d.deposit, d.withdrawal))) * 1.2;

  return (
    <Card className="w-full dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-medium dark:text-white">Weekly Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-4">
          <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 gap-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-600"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Deposit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-cyan-400"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Withdraw</span>
            </div>
          </div>

          <div className="h-[180px] md:h-[220px] flex items-end">
            {dummyData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex justify-center gap-1 h-[150px] md:h-[180px] items-end">
                  <div
                    className="w-2 md:w-3 bg-blue-600 rounded-t-sm"
                    style={{ height: `${(item.deposit / maxValue) * 100}%` }}
                  ></div>
                  <div
                    className="w-2 md:w-3 bg-cyan-400 rounded-t-sm"
                    style={{ height: `${(item.withdrawal / maxValue) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.day}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
