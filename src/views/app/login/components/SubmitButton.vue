<template>
  <button class="btn btn-primary w-100 py-2 mt-4" type="submit" :disabled="submitting">
    <span v-if="submitting" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span v-else>{{ text }}</span>
  </button>
</template>

<script setup>
const props = defineProps({
  submitting: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: "Submit",
  },
});
</script>
