<script setup lang="ts">
import { ref, watch } from "vue";
import { Search } from "./icons";

const props = defineProps({
  modelValue: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);
const internalSearchTerm = ref(props.modelValue);

watch(internalSearchTerm, (newVal) => {
  emit("update:modelValue", newVal);
});

watch(
  () => props.modelValue,
  (newVal) => {
    internalSearchTerm.value = newVal;
  }
);
</script>

<template>
  <div
    class="ml-auto mr-auto h-auto flex items-center justify-center bg-secondary px-4 rounded-md w-full md:w-auto py-2"
  >
    <Search class="w-4 h-4 text-primary-text" />
    <input
      v-model="internalSearchTerm"
      placeholder="Search an expense..."
      class="h-full px-4 outline-none focus:outline-none text-primary-text"
      type="text"
    />
  </div>
</template>
