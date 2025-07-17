<script setup lang="ts">
import { PropType } from "vue";
import { WalletOption } from "../types";
import { walletOptions } from "../constants";

const props = defineProps({
  setWalletOption: {
    type: Function as PropType<(opt: WalletOption) => void>,
    required: true
  }
})

</script>

<template>
  <div
    ref="drowndownRef"
    @click.stop
    class="absolute top-12 left-0 flex flex-col justify-center rounded-md bg-secondary min-w-full w-[200px] h-auto px-2 pt-2 pb-4"
  >
    <ul>
      <li
      v-for="walletOption of walletOptions"
      :key="walletOption.title as string"
      @click="setWalletOption(walletOption.title as WalletOption)"
        class="flex items-center hover:bg-primary transition-colors duration-150 rounded-md px-4 py-2 mt-2"
      >
        <component :is="walletOption.iconComponent" class="w-4 h-4 mr-4" />
        <span>{{ walletOption.title ? walletOption.title : 'All Wallets' }}</span>
      </li>
    </ul>
  </div>
</template>
