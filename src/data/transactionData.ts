export type Transaction = {
  id: string;
  type: "deposit" | "withdrawal";
  name: string;
  date: string;
  timestamp: number; // For sorting by date
  amount: number; // Store as number for sorting and filtering
  formattedAmount: string; // For display
  category: string;
  icon?: string;
  initials: string;
};

export const transactions: Transaction[] = [
  {
    id: "t1",
    type: "deposit",
    name: "Deposit from - JS Mastery",
    date: "28 January 2023",
    timestamp: new Date("2023-01-28").getTime(),
    amount: 72.00,
    formattedAmount: "72.00",
    category: "Income",
    initials: "JS",
  },
  {
    id: "t2",
    type: "withdrawal",
    name: "Deposit Paypal",
    date: "24 January 2023",
    timestamp: new Date("2023-01-24").getTime(),
    amount: 150.00,
    formattedAmount: "150.00",
    category: "Transfer",
    initials: "P",
  },
  {
    id: "t3",
    type: "withdrawal",
    name: "Jemi Wiliam",
    date: "21 January 2023",
    timestamp: new Date("2023-01-21").getTime(),
    amount: 12.00,
    formattedAmount: "12.00",
    category: "Transfer",
    initials: "JW",
  },
  {
    id: "t4",
    type: "withdrawal",
    name: "Netflix Subscription",
    date: "18 January 2023",
    timestamp: new Date("2023-01-18").getTime(),
    amount: 15.99,
    formattedAmount: "15.99",
    category: "Entertainment",
    initials: "NF",
  },
  {
    id: "t5",
    type: "deposit",
    name: "Salary - Tech Inc",
    date: "15 January 2023",
    timestamp: new Date("2023-01-15").getTime(),
    amount: 3200.00,
    formattedAmount: "3,200.00",
    category: "Income",
    initials: "TI",
  },
  {
    id: "t6",
    type: "withdrawal",
    name: "Grocery Shopping",
    date: "12 January 2023",
    timestamp: new Date("2023-01-12").getTime(),
    amount: 85.25,
    formattedAmount: "85.25",
    category: "Shopping",
    initials: "GS",
  },
  {
    id: "t7",
    type: "withdrawal",
    name: "Uber Ride",
    date: "10 January 2023",
    timestamp: new Date("2023-01-10").getTime(),
    amount: 24.50,
    formattedAmount: "24.50",
    category: "Transportation",
    initials: "UR",
  },
  {
    id: "t8",
    type: "deposit",
    name: "Freelance Payment",
    date: "07 January 2023",
    timestamp: new Date("2023-01-07").getTime(),
    amount: 350.00,
    formattedAmount: "350.00",
    category: "Income",
    initials: "FP",
  },
  {
    id: "t9",
    type: "withdrawal",
    name: "Electricity Bill",
    date: "05 January 2023",
    timestamp: new Date("2023-01-05").getTime(),
    amount: 42.80,
    formattedAmount: "42.80",
    category: "Utilities",
    initials: "EB",
  },
  {
    id: "t10",
    type: "withdrawal",
    name: "Restaurant Dinner",
    date: "02 January 2023",
    timestamp: new Date("2023-01-02").getTime(),
    amount: 68.35,
    formattedAmount: "68.35",
    category: "Food",
    initials: "RD",
  }
];

// List of all unique categories for filtering
export const transactionCategories = Array.from(
  new Set(transactions.map(t => t.category))
);
