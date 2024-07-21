<template>
  <div class="btn-group" role="group" aria-label="Radio Button Group">
        <template v-for="option in options">
          <input type="radio" class="btn-check" name="view" :id="`view-${option.id}`" autocomplete="off" :value="option.id" v-model="localValue" />
          <label class="btn btn-outline-primary" :for="`view-${option.id}`">{{ option.label }}</label>
        </template>
      </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  options: { type: Array, default: [] },
   modelValue: { type: String, default: '' }
});

const emit = defineEmits(['update:modelValue']);

const localValue = ref(props.modelValue);

watch(localValue, (newValue) => {
  emit('update:modelValue', newValue);
});

watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue;
});
</script>

<style scoped></style>
