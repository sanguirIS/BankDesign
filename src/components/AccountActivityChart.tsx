"use client";

import React from "react";

interface AccountActivityChartProps {
  activity: { date: string; amount: number }[];
  accountType: string;
}

export function AccountActivityChart({ activity, accountType }: AccountActivityChartProps) {
  // Find min and max values to scale the chart
  const amounts = activity.map(item => item.amount);
  const maxAmount = Math.max(...amounts);
  const minAmount = Math.min(...amounts);
  const range = maxAmount - minAmount;
  const chartHeight = 180;

  // Get data points for the chart
  const getPoints = () => {
    const points: { x: number; y: number }[] = activity.map((item, index) => {
      const x = (index / (activity.length - 1)) * 100;
      const normalizedAmount = ((item.amount - minAmount) / range);
      // Flip for credit accounts since they're usually displayed as negative
      const y = accountType === "credit"
        ? chartHeight - (normalizedAmount * chartHeight)
        : (1 - normalizedAmount) * chartHeight;

      return { x, y };
    });

    return points;
  };

  // Generate SVG path
  const generatePath = () => {
    const points = getPoints();
    if (points.length < 2) return "";

    const linePoints = points.map((point, index) => {
      return `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`;
    }).join(" ");

    return linePoints;
  };

  // Generate area path (for the filled area)
  const generateAreaPath = () => {
    const points = getPoints();
    if (points.length < 2) return "";

    let path = points.map((point, index) => {
      return `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`;
    }).join(" ");

    // Complete the path to create a closed shape
    path += ` L ${points[points.length - 1].x} ${chartHeight}`;
    path += ` L ${points[0].x} ${chartHeight}`;
    path += " Z";

    return path;
  };

  return (
    <div className="w-full h-full">
      <svg viewBox={`0 0 100 ${chartHeight}`} className="w-full h-full overflow-visible">
        {/* Area fill */}
        <path
          d={generateAreaPath()}
          fill={accountType === "credit" ? "rgba(239, 68, 68, 0.1)" : "rgba(22, 163, 74, 0.1)"}
          className="dark:fill-opacity-20"
        />

        {/* Line */}
        <path
          d={generatePath()}
          fill="none"
          stroke={accountType === "credit" ? "#ef4444" : "#16a34a"}
          strokeWidth="2"
          className="dark:opacity-90"
        />

        {/* Data points */}
        {getPoints().map((point, index) => (
          <React.Fragment key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="1.5"
              fill={accountType === "credit" ? "#ef4444" : "#16a34a"}
              className="dark:opacity-90"
            />
            {index % 2 === 0 && (
              <text
                x={point.x}
                y={chartHeight + 15}
                fontSize="6"
                textAnchor="middle"
                fill="currentColor"
                className="text-gray-500 dark:text-gray-400"
              >
                {activity[index].date.split("-")[2]}
              </text>
            )}
          </React.Fragment>
        ))}
      </svg>
    </div>
  );
}
