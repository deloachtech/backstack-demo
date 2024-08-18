<template>
  <div
    :class="[asSubheading ? 'page-subheading' : 'page-heading', 'd-md-flex justify-content-between page-heading-component']">
    <div class="text-start">
      <div :class="[asSubheading ? 'fs-3 fw-semibold' : 'fs-2 fw-bold']">{{ props.heading }}</div>

      <p v-if="hasSlot('text')" :class="['lead', { 'subheading-lead': asSubheading }]">
        <slot name="text"></slot>
      </p>
    </div>

    <div v-if="hasSlot('actions')" class="text-sm-start text-md-end mt-2 mt-md-0">
      <div class="d-flex align-self-baseline gap-1">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  heading: { type: String, required: true },
  asSubheading: { type: Boolean, default: false },
});

import { useSlots } from "vue";

const slots = useSlots();
const hasSlot = (name) => {
  return !!slots[name];
};
</script>


<style scoped>  
.subheading-lead {
  font-size: 1.13rem;
}
</style>