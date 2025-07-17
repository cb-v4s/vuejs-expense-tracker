<script setup lang="ts">
import { PiggyBank } from "./icons";
</script>

<template>
  <a
    href="/"
    class="h-auto flex items-center justify-center font-black px-4 mx-auto md:mx-0 w-auto rounded-md py-2 select-none"
  >
    <span class="p-2 bg-primary-text rounded-md">
      <PiggyBank class="h-6 w-6 text-primary" />
    </span>
    <span class="ml-2 text-xl text-primary-text">Expense Tracker</span>
  </a>
</template>
