<script setup>
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

const emit = defineEmits(["select"]);

const uniqueId = uuidv4();

const props = defineProps({
  label: String,
  options: {
    type: Array,
    required: true,
    default: [],
  },
  error: String,
  help: String,
  placeholder: {
    type: String,
    default: "Select",
  },
});

const placeholder = ref(props.placeholder);

const handleClick = (option) => {
  placeholder.value = option.label;
  emit("select", option);
};
</script>

<template>
  <div class="bva-select-extended">
    <label v-if="label" :for="uniqueId" class="form-label">{{ label }}</label>
    <div :id="uniqueId" class="dropdown d-flex justify-content-between align-items-center">
      <a :class="[error ? 'invalid-border' : '', 'btn btn-secondary dropdown-toggle w-100 d-flex justify-content-between align-items-center border-1']" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <span>{{ placeholder }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
        </svg>
      </a>

      <ul class="dropdown-menu">
        <li v-for="option in options" :key="option.id">
          <a @click.prevent="handleClick(option)" class="dropdown-item mt-1" href="javascript:void(0)">{{ option.text ? option.label + " - " + option.text : option.label }}</a>
        </li>
      </ul>
    </div>

    <div v-if="error" class="invalid-text">
      {{ error }}
    </div>
    <div v-if="help" class="form-text">{{ help }}</div>
  </div>
</template>


<style scoped>
.invalid-text {
  font-size: 0.875em;
  margin-top: 0.25rem;
  color: var(--bs-form-invalid-color);
}

.invalid-border {
  border-color: var(--bs-form-invalid-color);
}

.dropdown-menu {
  max-height: 400px;
  overflow-y: auto;
}

.dropdown-item {
  white-space: normal;
  overflow-wrap: break-word;
}

.dropdown-toggle::after {
  display: none;
}

.dropdown-toggle {
  justify-content: space-between;
  background-color: var(--dropdown-bg);
  color: var(--dropdown-color);
}

.dropdown-toggle:active,
.dropdown-toggle:focus {
  background-color: var(--dropdown-bg);
  border-color: var(--dropdown-bg);
  box-shadow: 0 0 0 0.3rem var(--bs-focus-ring-color);
}

[data-bs-theme="light"] .dropdown-item:hover {
  background-color: #3c3632ad;
  color: #f2f2f2;
}

[data-bs-theme="dark"] .dropdown-item:hover {
  background-color: #f0eded;
  color: #333;
}
</style>
