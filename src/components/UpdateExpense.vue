<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import {
  helpers,
  minLength,
  minValue,
  numeric,
  required,
} from "@vuelidate/validators";
import { computed, ref } from "vue";
import { ChevronDown } from "./icons";
import { useClickOutside } from "../composables/useClickOutside";
import { useExpensesStore } from "../composables/useExpensesStore";
import { walletOptions as wO } from "../constants";
const { updateExpense } = useExpensesStore();

const displayWalletDropdown = ref<boolean>(false);
const displayWalletDropdownRef = ref<HTMLElement | null>(null);
const emit = defineEmits(["close"]);

const props = defineProps({
    expenseName: {
        type: String,
        required: true
    },
    expenseAmount: {
        type: Number,
        required: true,
    },
    expenseCategory: {
        type: String,
        required: true
    }
});

const switchWalletDropdown = (): void => {
  displayWalletDropdown.value = !displayWalletDropdown.value;
};

useClickOutside(
  [displayWalletDropdownRef],
  switchWalletDropdown,
  displayWalletDropdown
);

const walletOptions = wO.slice(1, wO.length);

const defaultWalletOption = walletOptions.find(i => i.title === props.expenseCategory);
let walletOption = defaultWalletOption;

const setWalletOption = (idx: number) => {
  walletOption = walletOptions[idx];
};

const formData = ref({
  expenseName: props.expenseName,
  expenseAmount: props?.expenseAmount,
});

const rules = computed(() => ({
  expenseName: {
    required: helpers.withMessage("Expense name is mandatory", required),
    minLength: minLength(2),
  },
  expenseAmount: {
    required: helpers.withMessage("Expense amount is mandatory", required),
    numeric,
    minValue: minValue(0),
  },
}));

const v$ = useVuelidate(rules, formData);

const onSubmit = async () => {
  const isFormValid = await v$.value.$validate(); // Dispara la validación
  if (isFormValid) {
    updateExpense(props.expenseName, {
      title: formData.value.expenseName,
      amount: formData.value.expenseAmount as number,
      category: walletOption!.title as string,
    });

    v$.value.$reset();

    emit("close");
  } else {
    console.log("El formulario tiene errores de validación.");
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-col">
    <label
      class="mb-2 text-primary-text font-semibold select-none"
      for="expenseName"
    >
      Expense Name
    </label>
    <input
      v-model="formData.expenseName"
      class="outline-none px-4 py-2 rounded-md bg-primary text-primary-text text-sm md:text-base"
      type="text"
      placeholder="e.g. Books"
    />
    <span v-if="v$.expenseName.$error" class="text-red-500 text-sm mt-1">
      {{ v$.expenseName.$errors[0].$message }}
    </span>
    <div class="flex gap-[5%] md:gap-[5%]">
      <div class="flex flex-col w-[30%] md:w-[45%]">
        <label
          class="mt-4 mb-2 text-primary-text font-semibold select-none"
          for="expenseAmount"
        >
          Amount
        </label>
        <div
          class="px-4 py-1.5 md:py-2 rounded-md bg-primary text-primary-text flex"
        >
          <span class="font-semibold font-sm md:font-base">$</span>
          <input
            v-model="formData.expenseAmount"
            class="outline-none ml-2 w-full no-spin-arrows text-sm md:text-base"
            type="number"
            min="0"
            placeholder="e.g. 300"
          />
        </div>
        <span v-if="v$.expenseAmount.$error" class="text-red-500 text-sm mt-1">
          {{ v$.expenseAmount.$errors[0].$message }}
        </span>
      </div>
      <div class="flex flex-col w-[65%] md:w-[50%]">
        <label
          class="mt-4 mb-2 text-primary-text font-semibold select-none"
          for="expenseWallet"
        >
          Wallet
        </label>

        <span
          @click="switchWalletDropdown"
          class="outline-none px-4 py-2 rounded-md bg-primary text-primary-text flex items-center justify-center relative cursor-pointer"
        >
          <component
            :is="walletOption!.iconComponent"
            class="w-5 h-5 text-primary-text"
          />
          <span class="ml-4 mx-auto text-sm md:text-base">{{
            walletOption!.title
          }}</span>
          <ChevronDown class="w-5 h-5 text-primary-text" />

          <div
            ref="displayWalletDropdownRef"
            v-if="displayWalletDropdown == true"
            class="absolute w-auto min-w-40 h-auto top-12 left-0 bg-primary rounded-md px-4 py-2 flex flex-col"
          >
            <div
              @click="setWalletOption(index)"
              v-for="(item, index) in walletOptions"
              :key="index"
              class="flex justify-left items-center text-primary-text transition-colors duration-150 mt-4 cursor-pointer"
            >
              <Component :is="item.iconComponent" class="w-5 h-5" />
              <span class="ml-4">{{ item.title }}</span>
            </div>
          </div>
        </span>
      </div>
    </div>
    <div class="mt-10 ml-auto">
      <button
        @click="emit('close')"
        class="rounded-md bg-primary px-4 py-2 text-primary-text outline-none cursor-pointer text-sm md:text-base"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="rounded-md bg-primary px-4 py-2 text-primary-text outline-none cursor-pointer ml-2 text-sm md:text-base"
      >
        Add Expense
      </button>
    </div>
  </form>
</template>

<style>
input[type="number"].no-spin-arrows::-webkit-outer-spin-button,
input[type="number"].no-spin-arrows::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* fo firefox */
input[type="number"].no-spin-arrows {
  -moz-appearance: textfield;
}
</style>
