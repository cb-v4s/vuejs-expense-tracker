<script setup lang="ts">
import { ref } from "vue";
import { AlignJustify, ChevronDown } from "./icons";
import { useClickOutside } from "../composables/useClickOutside";
import SelectWallet from "./SelectWallet.vue"
import { WalletOption } from "../types";
import { useExpensesStore } from "../composables/useExpensesStore"

const { clearExpenses, walletOption } = useExpensesStore();

const drowndownRef = ref(null);
const showDropdown = ref(false);

const toggleDropdown = () => showDropdown.value = !showDropdown.value;

useClickOutside([drowndownRef], toggleDropdown, showDropdown)


const setWalletOption = (opt: WalletOption) => {
  walletOption.value = opt;
  showDropdown.value = false;
}

</script>

<template>
  <div
    class="h-20 w-full mt-0 md:mt-10 flex justify-center items-center p-4 md:p-8"
  >
    <button
      @click="toggleDropdown"
      aria-haspopup="true"
      :aria-expanded="showDropdown ? 'true' : 'false'"
      class="mr-auto flex justify-center items-center rounded-md bg-secondary text-primary-text py-2 px-4 outline-none relative cursor-pointer select-none"
    >
      <AlignJustify class="w-4 h-4 mr-4" />
      <span class="h-full">{{ walletOption ? walletOption : 'All Wallets' }}</span>
      <ChevronDown class="w-4 h-4 ml-4" />

      <SelectWallet :setWalletOption="setWalletOption" v-if="showDropdown" />
    </button>

    <button
    @click="clearExpenses()"
      class="ml-auto flex justify-center items-center rounded-md bg-secondary text-primary-text transition-colors duration-150 py-2 px-4 outline-none cursor-pointer select-none"
    >
      <span class="h-full">Clear All</span>
    </button>
  </div>
</template>
