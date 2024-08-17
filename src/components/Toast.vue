<template>
  <div v-if="isVisible" class="toast-container position-fixed p-3 top-0 start-50 translate-middle-x toast-component">
    <div class="toast show align-items-center bg-primary border-0" role="alert" aria-live="assertive"
      aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          {{ message }}
        </div>
        <button v-if="showCloseButton" type="button" class="btn-close btn-close-white me-2 m-auto" @click="hideToast"
          aria-label="Close"></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  open: { type: Boolean, default: false },
  message: { type: String, default: "" },
  showCloseButton: { type: Boolean, default: false }
});

const isVisible = ref(false);
let timeoutId = null;

const displayDuration = computed(() => {
  const words = props.message.split(' ').length;
  return Math.max(3000, words * 300); // Minimum 3 seconds, 300ms per word
});

const hideToast = () => {
  isVisible.value = false;
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
};

const showToast = () => {
  isVisible.value = true;
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(hideToast, displayDuration.value);
};

// Watch for changes in props.open
watch(() => props.open, (newVal) => {
  if (newVal) {
    showToast();
  } else {
    hideToast();
  }
});
</script>