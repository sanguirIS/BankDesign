export type Account = {
  id: string;
  name: string;
  type: "checking" | "savings" | "investment" | "credit";
  balance: number;
  formattedBalance: string;
  accountNumber: string;
  currency: string;
  icon: string;
  institution: string;
  color: string;
  activity: {
    date: string;
    amount: number;
  }[];
};

export const accounts: Account[] = [
  {
    id: "acc1",
    name: "Main Checking",
    type: "checking",
    balance: 8245.20,
    formattedBalance: "8,245.20",
    accountNumber: "****2341",
    currency: "USD",
    icon: "bank",
    institution: "Chase Bank",
    color: "blue",
    activity: [
      { date: "2023-01-01", amount: 7500.00 },
      { date: "2023-01-05", amount: 7200.00 },
      { date: "2023-01-10", amount: 7800.00 },
      { date: "2023-01-15", amount: 8100.00 },
      { date: "2023-01-20", amount: 7900.00 },
      { date: "2023-01-25", amount: 8300.00 },
      { date: "2023-01-30", amount: 8245.20 }
    ]
  },
  {
    id: "acc2",
    name: "High Yield Savings",
    type: "savings",
    balance: 12356.78,
    formattedBalance: "12,356.78",
    accountNumber: "****7890",
    currency: "USD",
    icon: "piggy-bank",
    institution: "Ally Bank",
    color: "green",
    activity: [
      { date: "2023-01-01", amount: 10000.00 },
      { date: "2023-01-05", amount: 10500.00 },
      { date: "2023-01-10", amount: 11000.00 },
      { date: "2023-01-15", amount: 11200.00 },
      { date: "2023-01-20", amount: 11800.00 },
      { date: "2023-01-25", amount: 12100.00 },
      { date: "2023-01-30", amount: 12356.78 }
    ]
  },
  {
    id: "acc3",
    name: "Investments",
    type: "investment",
    balance: 43289.15,
    formattedBalance: "43,289.15",
    accountNumber: "****5432",
    currency: "USD",
    icon: "trending-up",
    institution: "Vanguard",
    color: "purple",
    activity: [
      { date: "2023-01-01", amount: 40000.00 },
      { date: "2023-01-05", amount: 39500.00 },
      { date: "2023-01-10", amount: 41000.00 },
      { date: "2023-01-15", amount: 42200.00 },
      { date: "2023-01-20", amount: 41800.00 },
      { date: "2023-01-25", amount: 42500.00 },
      { date: "2023-01-30", amount: 43289.15 }
    ]
  },
  {
    id: "acc4",
    name: "Premium Credit Card",
    type: "credit",
    balance: -2458.32,
    formattedBalance: "2,458.32",
    accountNumber: "****9876",
    currency: "USD",
    icon: "credit-card",
    institution: "American Express",
    color: "red",
    activity: [
      { date: "2023-01-01", amount: -1500.00 },
      { date: "2023-01-05", amount: -1800.00 },
      { date: "2023-01-10", amount: -2100.00 },
      { date: "2023-01-15", amount: -2300.00 },
      { date: "2023-01-20", amount: -2100.00 },
      { date: "2023-01-25", amount: -2250.00 },
      { date: "2023-01-30", amount: -2458.32 }
    ]
  }
];
