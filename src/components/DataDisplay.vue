<script setup>
import { useSlots, computed } from "vue";

const emit = defineEmits(["action"]);

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: [],
  },
  heading: String,
  headingText: String,
});

const slots = useSlots();
const hasSlot = (name) => {
  return !!slots[name];
};

</script>

<template>
  <div v-if="heading" class="border-bottom border-gray-100 mb-3">
    <h3 class="text-base fw-semibold mb-2 text-gray-900">{{ heading }}</h3>
    <p v-if="headingText" class="mb-3 max-w-2xl text-sm text-gray-500">
      {{ headingText }}
    </p>
  </div>

  <div class="">
    <div v-for="(item, index) in data" :key="index" class="py-3 col-12 bva-data-display">
      <dt class="text-sm fw-medium text-gray-900">{{ item.label }}</dt>

      <dd v-if="hasSlot(item.key)" class="mt-1 text-sm text-gray-700">
        <slot :name="item.key" :item="item">
          {{ item.key }}
        </slot>
      </dd>

      <dd v-else class="mt-1 d-flex text-sm text-gray-700">
        <span class="flex-grow-1">{{ item.value }}</span>

        <span v-if="item.action" class="ms-4">
          <button @click.prevent="emit('action', item)" type="button" class="btn btn-outline-primary btn-sm">
            {{ item.action }}
          </button>
        </span>
      </dd>
    </div>
  </div>
</template>

<style scoped></style>
