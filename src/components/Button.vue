<template>
  <button @click.prevent="emit('click')" :type="props.type"
    :class="['btn', props.class]"
    style="white-space: nowrap;"
    :disabled="props.disabled || props.submitting">
    <span v-if="props.submitting" class="spinner-border spinner-border-sm" style="margin-right: 4px;"
      aria-hidden="true"> </span>
    <span v-if="props.submitting" class="visually-hidden" role="status">Submitting...</span>
    <slot></slot>
  </button>

</template>

<script setup>
//:class="['btn', { 'btn-primary': props.primary, 'btn-secondary': !props.primary }]" 

const emit = defineEmits(["click"]);

const props = defineProps({ 
  class: { type: String, default: "btn-primary" },
  submitting: { type: Boolean, default: false },
  primary: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: "button" },
});
</script>

<style scoped>

</style>
