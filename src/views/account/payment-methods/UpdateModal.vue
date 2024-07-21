<template>
  <Modal :open="open" heading="Update Credit Card" :submitting="submitting" @submit="submit" @cancel="cancel">
    <div class="row gy-4 form">
      <div class="col-12">
        <label for="cc-number" class="form-label">Card number</label>
        <input id="cc-number" class="form-control" type="text" :value="`${card.brand} **** **** **** ${card.last4}`" :aria-label="`${card.brand} **** **** **** ${card.last4}`" disabled readonly />
      </div>
      <div class="col-6">
        <label for="exp_month" class="form-label">Expires Month</label>
        <select id="exp_month" class="form-control" v-model="data.exp_month">
          <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
        </select>
      </div>
      <div class="col-6">
        <label for="exp_year" class="form-label">Expires Year</label>
        <select id="exp_year" class="form-control" v-model="data.exp_year">
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
      <div v-if="error" class="text-danger">Expiration date cannot be in the past.</div>
    </div>
  </Modal>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import { Modal } from "@/components";

const emit = defineEmits(["cancel", "success"]);

const props = defineProps({
  open: { type: Boolean, default: false },
  card: {
    type: Object,
    required: true,
    default: {
      id: "",
      brand: "",
      last4: "",
      exp_month: "",
      exp_year: "",
    },
  },
});

const submitting = ref(false);
const error = ref(false);
const data = ref({
  exp_month: props?.card?.exp_month,
  exp_year: props?.card?.exp_year,
});

watch(
  () => props.card,
  (newCard) => {
    data.value.exp_month = newCard.exp_month;
    data.value.exp_year = newCard.exp_year;
  },
  { immediate: true }
);

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1; // Months are zero-based

const years = Array.from({ length: 15 }, (v, i) => currentYear + i);
const months = Array.from({ length: 12 }, (v, i) => String(i + 1).padStart(2, "0"));

const submit = async () => {
  error.value = false;

  const selectedYear = parseInt(data.value.exp_year);
  const selectedMonth = parseInt(data.value.exp_month);

  if (selectedYear < currentYear || (selectedYear === currentYear && selectedMonth < currentMonth)) {
    error.value = true;
  }

  if (error.value === true) {
    return;
  }

  submitting.value = true;

  await axios
    .post(`https://api.backstack.com/v1/account/payment-methods/${props.card.id}`, data.value, { api: "backstack" })
    .then((response) => {
      emit("success", response.data);
    })
    .catch((error) => {
      error.value = true;
    })
    .finally(() => {
      submitting.value = false;
    });
};

const cancel = () => {
  emit("cancel");
};
</script>

<style scoped></style>
