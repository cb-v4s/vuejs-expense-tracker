import { computed, reactive, ref, watchEffect } from "vue";
import { Expense, ExpensesState, WalletOption } from "../types";

const LOCAL_STORAGE_KEY = "expenses_app_data";
const searchTerm = ref("");
const walletOption = ref<WalletOption | null>(null);
const state: ExpensesState = reactive({
  expenses: loadExpensesFromLocalStorage(),
});

function loadExpensesFromLocalStorage(): Expense[] {
  try {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      if (
        Array.isArray(parsedData) &&
        parsedData.every(
          (item) =>
            typeof item.id === "string" &&
            typeof item.title === "string" &&
            typeof item.amount === "number" &&
            typeof item.date === "string"
        )
      )
        return parsedData;
    }
  } catch (e) {
    console.error("Error loading expenses from localStorage:", e);
  }

  return [];
}

watchEffect(() => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.expenses));
  } catch (e) {
    console.error("Error saving expenses to localStorage:", e);
  }
});

const filteredExpenses = computed(() => {
  if (!searchTerm.value && !walletOption.value) return state.expenses;

  let resultExpenses: Expense[] = state.expenses;
  
  if (searchTerm.value) {
    const lowerCaseSearchTerm = searchTerm.value.toLowerCase();

    resultExpenses = state.expenses.filter((expense) =>
      expense.title.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

  if (walletOption.value) {
    resultExpenses = resultExpenses.filter((expense) => expense.category === walletOption.value);
  }

  return resultExpenses;
});

export function useExpensesStore() {
  const addExpense = (newExpenseData: Omit<Expense, "date" | "id">) => {
    const newExpense: Expense = {
      date: new Date(),
      id: crypto.randomUUID(),
      ...newExpenseData,
    };

    state.expenses.push(newExpense);
  };

  const updateExpense = (
    title: string,
    updatedData: Partial<Omit<Expense, "id" | "date">>
  ) => {
    const index = state.expenses.findIndex(
      (expense) => expense.title === title
    );
    if (index !== -1) {
      state.expenses[index] = { ...state.expenses[index], ...updatedData };
    } else {
      console.warn(`Expense with title ${title} not found for update.`);
    }
  };

  const deleteExpense = (id: string) => {
    state.expenses = state.expenses.filter((expense) => expense.id !== id);
  };

  const clearExpenses = (): void => {
    state.expenses = [];
  };

  return {
    expenses: computed(() => state.expenses),
    filteredExpenses,
    walletOption,
    searchTerm,
    addExpense,
    updateExpense,
    deleteExpense,
    clearExpenses,
  };
}
