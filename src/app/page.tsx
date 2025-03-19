import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { CardTransactionTabs } from "@/components/CardTransactionTabs";
import { WeeklyActivityChart } from "@/components/WeeklyActivityChart";
import { ExpenseStatistics } from "@/components/ExpenseStatistics";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <Header />

        <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Cards and Transactions Section */}
            <CardTransactionTabs />

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <WeeklyActivityChart />
              <ExpenseStatistics />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
