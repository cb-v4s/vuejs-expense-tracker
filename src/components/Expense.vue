<script setup lang="ts">
import { Pen, Trash } from "./icons";
import { useExpensesStore } from "../composables/useExpensesStore";
import UpdateExpense from './UpdateExpense.vue'
import Modal from "./Modal.vue"
const { deleteExpense } = useExpensesStore();
import { walletOptions } from "../constants";
import { ref } from "vue";

const popupOpen = ref<boolean>(false);

const props = defineProps({
  expenseName: {
    type: String,
  },
  expenseAmount: {
    type: Number,
  },
  expenseCategory: {
    type: String,
  },
  expenseId: {
    type: String,
  },
});
</script>

<template>
  <li
    :key="props.expenseId"
    class="rounded-md shadow-md shadow-secondary w-full min-h-20 flex items-center px-4 mt-4 text-primary-text"
  >
    <div class="mr-auto flex items-center">
      <span class="p-2 md:p-4 bg-secondary mr-4 rounded-md">
        <component
          :is="
            walletOptions.find((wO) => wO.title === props.expenseCategory)
              ?.iconComponent
          "
          class="h-4 w-4 md:h-6 md:w-6"
        />
      </span>
      <div class="flex-col max-w-20 md:max-w-100">
        <p class="text-sm md:text-base font-black truncate">
          {{ props.expenseName }}
        </p>
        <p class="text-xs truncate">{{ props.expenseCategory }}</p>
      </div>
    </div>
    <div class="ml-auto flex items-center mr-4 md:mr-6">
      <span class="font-semibold"
        >-{{
          new Intl.NumberFormat("es-ES").format(props.expenseAmount as number)
        }}$</span
      >
    </div>
    <div class="flex items-center">
      <button
        @click="popupOpen = true"
        class="rounded-md p-2 md:p-4 bg-secondary cursor-pointer outline-none"
      >
        <Pen class="h-4 w-4" />
      </button>
      <button
        @click="deleteExpense(props.expenseId as string)"
        class="rounded-md p-2 md:p-4 bg-secondary ml-2 cursor-pointer outline-none"
      >
        <Trash class="h-4 w-4" />
      </button>
    </div>

    <Modal title="Update Expense" :is-open="popupOpen" @close="popupOpen = false">
      <UpdateExpense :expense-amount="props.expenseAmount as number" :expense-name="props.expenseName as string" :expense-category="props.expenseCategory as string" @close="popupOpen = false" />
    </Modal>
  </li>
  
</template>
