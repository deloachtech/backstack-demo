<template>
  <Modal :open="open" heading="Add Credit Card" :loading="loading" :submitting="submitting" @submit="submit"
    @cancel="cancel">

    <div class="row gy-4">
      <div class="col-12">

        <FormInput label="Card number" v-model="data.card_number" :error="errors.card_number" />

      </div>
      <div class="col-4">

        <FormSelect label="Exp Month" v-model="data.exp_month" :error="errors.exp_month"
          :options="creditCardExpireMonths()" />

      </div>

      <div class="col-4">

        <FormSelect label="Exp Year" v-model="data.exp_year" :error="errors.exp_year"
          :options="creditCardExpireYears()" />
      </div>

      <div class="col-4">

        <FormInput label="CVC" v-model="data.cvc" :error="errors.cvc" />

      </div>
    </div>
    <div class="form-check mt-4">
      <input v-model="data.default" class="form-check-input" type="checkbox" id="default" />
      <label class="form-check-label" for="default"> This is my default payment method. </label>
    </div>
  </Modal>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { Modal, FormInput, FormSelect } from "@/components";
import { useSession } from "@/session";
import { validateCreditCardLuhn, validateCreditCardExpiration, validateCreditCardCvc, creditCardExpireMonths, creditCardExpireYears } from "@/utils";

const session = useSession();

const emit = defineEmits(["cancel", "success"]);

const props = defineProps({
  open: { type: Boolean, default: false },
});

const submitting = ref(false);
const loading = ref(false);

const errors = ref({});
const data = ref({
  card_number: "",
  exp_month: "",
  exp_year: "",
  cvc: "",
  default: false,
});



const submit = async () => {

  errors.value = {};

  if (data.value.card_number) {
    if (!validateCreditCardLuhn(data.value.card_number)) errors.value.card_number = "Invalid number";
  } else { errors.value.card_number = "Required value"; }


  if (!data.value.exp_month) errors.value.exp_month = "Required value";
  if (!data.value.exp_year) errors.value.exp_year = "Required value";

  if (data.value.exp_month && data.value.exp_year) {
    if (!validateCreditCardExpiration(data.value.exp_month, data.value.exp_year)) errors.value.exp_year = "Card expired";
  }

  if (data.value.cvc) {
    if (!validateCreditCardCvc(data.value.cvc)) errors.value.cvc = "Invalid CVC";
  } else { errors.value.cvc = "Required value"; }

  if (Object.keys(errors.value).length > 0) {
    return;
  }

  submitting.value = true;

  await axios
    .post("https://api.backstack.com/account/payment-methods/create", data.value, { api: "backstack" })
    .then((response) => emit("success", response.data))
    .catch((error) => console.error(error))
    .finally(() => submitting.value = false);
};

const cancel = () => {
  errors.value = {};
  data.value.cvc = "";
  data.value.exp_month = "";
  data.value.exp_year = "";
  data.value.card_number = "";
  data.value.default = false;
  data.value.token = "";
  emit("cancel");
};
</script>
