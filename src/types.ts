export interface Expense {
  title: string;
  amount: number;
  category: string;
  date: Date;
  id: string;
}

export interface ExpensesState {
  expenses: Expense[];
}

export type WalletOption = "Bank Account" | "Credit Card" | "Savings";