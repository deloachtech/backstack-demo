<template>
  <div class="form-select-component">
    <label v-if="label" :for="uniqueId" class="form-label">
      <Tooltip :tip="tip">{{ label }}</Tooltip>
    </label>
    <select @change="emit('change', modelValue)" v-model="modelValue" :id="uniqueId" :class="['form-select', { 'is-invalid': error }]">
      <option v-for="o in options" :key="o.id" :value="o.id">{{ o.title }}</option>
    </select>
    <div v-if="error" class="invalid-feedback">{{ error }}</div>
    <div v-if="help" class="form-text">{{ help }}</div>
  </div>
</template>

<script setup>
import Tooltip from "./Tooltip.vue";
import { v4 as uuidv4 } from "uuid";

const props = defineProps({
  label: String,
  tip: String,
  help: String,
  error: String,
  options: {
    type: Array,
    required: true,
    default: [],
  },
});

const emit = defineEmits(["change"]);

const uniqueId = uuidv4();
const modelValue = defineModel();
</script>
