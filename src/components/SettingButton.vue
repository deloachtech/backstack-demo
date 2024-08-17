<template>

  <button type="button" @click.prevent="emit('click')" class="btn btn-outline-primary btn-sm mt-2 mt-md-0">{{ text }}</button>
</template>

<script setup>
const emit = defineEmits(["click"]);

const props = defineProps({
  text: { type: String,  default: "Update" },
});
</script>
