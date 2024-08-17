<template>
  <div class="form-input-component">
    <label v-if="label" :for="id" class="form-label">
      <Tooltip :tip="tip">{{ label }}</Tooltip>
    </label>
    <input v-model="modelValue" :type="type" :class="['form-control', { 'is-invalid': error }]" :id="props.id ?? uuidv4()" />
    <div v-if="error" class="invalid-feedback">{{ error }}</div>
    <div v-if="help" class="form-text">{{ help }}</div>
  </div>
</template>

<script setup>
import Tooltip from "./Tooltip.vue";
import { v4 as uuidv4 } from "uuid";

const props = defineProps({
  id: String,
  label: String,
  tip: String,
  help: String,
  type: { type: String, default: "text" },
  error: String,
});


const modelValue = defineModel();
</script>

<script>
const uniqueId = uuidv4();
</script>
