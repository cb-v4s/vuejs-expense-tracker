<script setup lang="ts">
import { ref } from "vue";
import { Plus } from "./icons";
import Modal from "./Modal.vue"
import NewExpense from "./NewExpense.vue";

const popupOpen = ref(false);
</script>

<template>
  <button
    @click="popupOpen = true"
    class="bg-primary-text flex items-center justify-center rounded-md px-4 outline-none focus:outline-none py-2 cursor-pointer select-none text-primary transition-colors duration-150 font-semibold"
  >
    <Plus class="w-4 h-4" />
    <span class="ml-2">Add expense</span>
  </button>

  <Modal
    title="Add Expense"
    :is-open="popupOpen"
    @close="popupOpen = false"
  >
    <NewExpense @close="popupOpen = false" />
  </Modal>
</template>
