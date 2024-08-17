<template>
  <span :class="colors[color]" style="margin-right: 8px"></span>
</template>

<script setup>
const props = defineProps({
  color: { type: String, default: "info" },
});

const colors = {
  success: "d-inline-block bg-success rounded-circle p-1",
  warning: "d-inline-block bg-warning rounded-circle p-1",
  info: "d-inline-block bg-info rounded-circle p-1",
  warning: "d-inline-block bg-warning rounded-circle p-1",
  danger: "d-inline-block bg-danger rounded-circle p-1",
};
</script>
