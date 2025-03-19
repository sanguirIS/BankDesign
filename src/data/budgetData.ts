export type BudgetCategory = {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
  icon: string;
};

export const budgetCategories: BudgetCategory[] = [
  {
    id: "b1",
    name: "Housing",
    allocated: 1200,
    spent: 1150,
    color: "blue",
    icon: "home"
  },
  {
    id: "b2",
    name: "Food & Dining",
    allocated: 500,
    spent: 420,
    color: "green",
    icon: "utensils"
  },
  {
    id: "b3",
    name: "Transportation",
    allocated: 300,
    spent: 275,
    color: "purple",
    icon: "car"
  },
  {
    id: "b4",
    name: "Entertainment",
    allocated: 200,
    spent: 180,
    color: "pink",
    icon: "film"
  },
  {
    id: "b5",
    name: "Shopping",
    allocated: 300,
    spent: 420,
    color: "red",
    icon: "shopping-bag"
  },
  {
    id: "b6",
    name: "Utilities",
    allocated: 150,
    spent: 145,
    color: "yellow",
    icon: "zap"
  },
  {
    id: "b7",
    name: "Health",
    allocated: 200,
    spent: 65,
    color: "teal",
    icon: "activity"
  },
  {
    id: "b8",
    name: "Personal",
    allocated: 150,
    spent: 115,
    color: "orange",
    icon: "user"
  }
];

export const monthlyBudget = {
  month: "February",
  year: 2023,
  totalAllocated: budgetCategories.reduce((sum, cat) => sum + cat.allocated, 0),
  totalSpent: budgetCategories.reduce((sum, cat) => sum + cat.spent, 0),
};
