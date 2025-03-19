export type Notification = {
  id: string;
  title: string;
  message: string;
  type: "transaction" | "security" | "account" | "system";
  read: boolean;
  date: string;
  timestamp: number;
};

export const notifications: Notification[] = [
  {
    id: "n1",
    title: "Transaction Completed",
    message: "Your transfer of $250.00 to John Smith has been completed.",
    type: "transaction",
    read: false,
    date: "Just now",
    timestamp: Date.now() - 1000 * 60 * 5, // 5 minutes ago
  },
  {
    id: "n2",
    title: "Security Alert",
    message: "A new login was detected from New York, USA. Was this you?",
    type: "security",
    read: false,
    date: "10 minutes ago",
    timestamp: Date.now() - 1000 * 60 * 10, // 10 minutes ago
  },
  {
    id: "n3",
    title: "Bill Payment Reminder",
    message: "Your credit card bill of $1,200 is due in 3 days.",
    type: "account",
    read: false,
    date: "25 minutes ago",
    timestamp: Date.now() - 1000 * 60 * 25, // 25 minutes ago
  },
  {
    id: "n4",
    title: "Bank Statement Available",
    message: "Your January 2023 statement is now available to view.",
    type: "account",
    read: true,
    date: "1 hour ago",
    timestamp: Date.now() - 1000 * 60 * 60, // 1 hour ago
  },
  {
    id: "n5",
    title: "Suspicious Activity",
    message: "We detected a suspicious attempt to access your account.",
    type: "security",
    read: true,
    date: "2 hours ago",
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
  },
  {
    id: "n6",
    title: "Large Transaction Alert",
    message: "A transaction of $2,500 was made from your checking account.",
    type: "transaction",
    read: true,
    date: "Yesterday",
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
  },
  {
    id: "n7",
    title: "System Maintenance",
    message: "BankDash will be undergoing maintenance on Sunday, Feb 5 from 2-4 AM EST.",
    type: "system",
    read: true,
    date: "2 days ago",
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
  },
];
