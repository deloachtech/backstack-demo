<template>
  <div class="d-flex gap-1 mb-3 table-toolbar-component">
    <input v-if="!hideSearch" class="form-control" type="search" placeholder="Search" aria-label="Search" style="max-width: 15rem" v-model="searchQuery" @input="debouncedEmitSearch" />

    <div v-if="!hideFilters" class="dropdown dropdown-menu-end">
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-funnel"></i> {{ selectedFilterLabel }}</button>
      <ul class="dropdown-menu">
        <li v-for="(v, k) in filters" :key="k">
          <a @click.prevent="selectFilter(v, k)" class="dropdown-item" href="javascript:void(0)">{{ v }}</a>
        </li>
      </ul>
    </div>

    <button v-if="!hideAdd" type="button" @click="emit('add')" class="btn btn-primary"><i class="bi bi-plus-lg fw-bolder"></i></button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["filter", "add", "search"]);

const searchQuery = ref("");

const props = defineProps({
  filters: {
    type: Object,
    default: {},
  },
  hideSearch: {
    type: Boolean,
    default: false,
  },
  hideFilters: {
    type: Boolean,
    default: false,
  },
  hideAdd: {
    type: Boolean,
    default: false,
  },
});

const selectedFilterLabel = ref("All");

const selectFilter = (label, value) => {
  selectedFilterLabel.value = label;
  emit("filter", value);
};

const emitSearch = () => {
  emit("search", searchQuery.value);
};

// Custom debounce function
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// Debounce the emitSearch function
const debouncedEmitSearch = debounce(emitSearch, 500); // 500ms debounce delay
</script>
