<template>
  <Modal :open="open" heading="Add Credit Card" :loading="loading" :submitting="submitting" @submit="submit"
    @cancel="cancel">

    <div class="row gy-4">
      <div class="col-12">

        <FormInput label="Card number" v-model="data.cardNumber" :error="errors.cardNumber" />

      </div>
      <div class="col-4">

        <FormSelect label="Exp Month" v-model="data.cardExpireMonth" :error="errors.cardExpireMonth"
          :options="creditCardExpireMonths()" />

      </div>

      <div class="col-4">

        <FormSelect label="Exp Year" v-model="data.cardExpireYear" :error="errors.cardExpireYear"
          :options="creditCardExpireYears()" />
      </div>

      <div class="col-4">

        <FormInput label="CVC" v-model="data.cardCvc" :error="errors.cardCvc" />

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
  cardNumber: "",
  cardExpireMonth: "",
  cardExpireYear: "",
  cardCvc: "",
  default: false,
});



const submit = async () => {

  if (data.value.cardNumber) {
    if (!validateCreditCardLuhn(data.value.cardNumber)) errors.value.cardNumber = "Invalid number";
  } else { errors.value.cardNumber = "Required value"; }


  if (!data.value.cardExpireMonth) errors.value.cardExpireMonth = "Required value";
  if (!data.value.cardExpireYear) errors.value.cardExpireYear = "Required value";

  if (data.value.cardExpireMonth && data.value.cardExpireYear) {
    if (!validateCreditCardExpiration(data.value.cardExpireMonth, data.value.cardExpireYear)) errors.value.cardExpireYear = "Card expired";
  }

  if (data.value.cardCvc) {
    if (!validateCreditCardCvc(data.value.cardCvc)) errors.value.cardCvc = "Invalid CVC";
  } else { errors.value.cardCvc = "Required value"; }

  if (Object.keys(errors.value).length > 0) {
    return;
  }

  submitting.value = true;

  await axios
    .post("https://api.backstack.com/v1/account/payment-methods/create", data.value, { api: "backstack" })
    .then((response) => emit("success", response.data))
    .catch((error) => console.error(error))
    .finally(() => submitting.value = false);
};

const cancel = () => {
  errors.value = {};
  data.value.cardCvc = "";
  data.value.cardExpireMonth = "";
  data.value.cardExpireYear = "";
  data.value.cardNumber = "";
  data.value.default = false;
  data.value.token = "";
  emit("cancel");
};
</script>
