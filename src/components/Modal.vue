<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["close"]);

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Modal"
  },
});

const modalContentRef = ref(null);

const closeModal = () => {
  emit("close");
};
</script>

<template>
  <Transition name="modal-fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
      @click.self="closeModal"
    >
      <div
        ref="modalContentRef"
        class="rounded-lg shadow-2xl max-w-lg w-full transform transition-all duration-300 ease-out scale-95"
        :class="{ 'scale-100 opacity-100': isOpen }"
      >
        <div
          class="flex justify-between items-center bg-secondary rounded-t-md px-6 py-4"
        >
          <span class="font-semibold text-xl text-primary-text">{{ title }}</span>
          
          <button
            @click="closeModal"
            class="transition-colors duration-200 rounded-full ml-auto text-primary-text outline-none cursor-pointer"
            aria-label="Close modal"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div class="p-6 bg-secondary rounded-b-md">
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>
