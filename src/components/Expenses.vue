<script setup lang="ts">
import { useExpensesStore } from "../composables/useExpensesStore";
import Expense from "./Expense.vue";

const { filteredExpenses } = useExpensesStore();
</script>

<template>
  <div
    class="flex justify-center items-center px-4 md:px-8 mt-4 text-sm md:text-base text-primary-text"
  >
    <span class="ml-auto font-semibold">
      {{ filteredExpenses.length }}
      {{ filteredExpenses.length > 1 ? "Transactions" : "Transaction" }}
    </span>
    <span class="font-semibold ml-12">
      ${{
        new Intl.NumberFormat("es-ES").format(
          filteredExpenses.reduce(
            (acc, expense: any) => acc + expense.amount,
            0
          )
        )
      }}
      in expenses
    </span>
  </div>
  <div class="mt-6 px-4 md:px-8 pb-2 flex-col max-h-100 overflow-y-auto">
    <ul v-if="filteredExpenses.length" v-for="expense in filteredExpenses">
      <Expense
        :expense-name="expense.title"
        :expense-amount="expense.amount"
        :expense-category="expense.category"
        :expense-id="expense.id"
      />
    </ul>
    <p v-else class="text-xl text-primary-text font-semibold text-center mt-20">
      No transactions yet.
    </p>
  </div>
</template>

<style>
/* width */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 20px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
