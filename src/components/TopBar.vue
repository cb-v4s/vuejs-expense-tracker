<script setup lang="ts">
import SearchBar from "./SearchBar.vue";
import BtnNewExpense from "./BtnNewExpense.vue";
import Logo from "./Logo.vue";
import { useExpensesStore } from "../composables/useExpensesStore";

const { searchTerm } = useExpensesStore();
</script>

<template>
  <div
    class="w-full flex flex-col md:flex-row px-4 md:px-8 py-4 rounded-md gap-2 md:gap-0 h-auto md:h-18"
  >
    <Logo />
    <SearchBar v-model="searchTerm"  />
    <BtnNewExpense />
  </div>
</template>
