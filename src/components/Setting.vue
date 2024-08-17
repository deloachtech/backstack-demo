<template>
  <div class="row mb-5 setting-component">
    <div class="col-sm-3 fw-bold">{{ label }}</div>
    <div class="col-sm-7">
      <slot name="value">
        {{ value }}
      </slot>
    </div>
    <div class="col-sm-2 text-md-end">
      <slot></slot>
    </div>
    <div v-if="hasSlot('help')" class="form-text mt-3">
      <slot name="help"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, required: true, default: "" },
  value: { type: String, required: false, default: "" },
});

import { useSlots } from "vue";

const slots = useSlots();
const hasSlot = (name) => {
  return !!slots[name];
};


</script>
