<script setup>
import Footer from './components/Footer.vue';
import TopBar from "./components/TopBar.vue";
import WalletsOptions from "./components/WalletsOptions.vue";
import Expenses from "./components/Expenses.vue";
</script>

<template>
  <div class="bg-primary min-h-screen min-w-screen w-full h-full flex flex-col items-center px-4 md:p-8">
    <div class="w-full md:w-3/4 min-h-[80vh]">
      <TopBar />
      <WalletsOptions />
      <Expenses />
    </div>
    <Footer />
  </div>
</template>