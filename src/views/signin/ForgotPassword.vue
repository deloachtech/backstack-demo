<template>
  <form novalidate @submit.prevent="submit" class="signin-form bva-signin-form">
    <div class="text-center">
      <Logo class="mb-2" />
    </div>

    <h2 class="h4 mb-3 fw-normal text-center">{{ success ? "Check your email!" : "Lookup Password" }}</h2>

    <div v-if="success" class="text-center">
      <p>Password recovery instructions have been sent to your email address.</p>
    </div>

    <div v-else>
      <FormInput label="Email" v-model="data.email" :error="errors.email" type="email"
        help="An email with a reset password link will be sent to the address provided." class="mb-3" />

      <SubmitButton :submitting="submitting" text="Send Email" />

      <div class="mt-3 mb-3 text-body-secondary text-center">
        <div><a href="/login">Remembered?</a></div>
      </div>
    </div>
  </form>
</template>

<script setup>
import Logo from "@/template/Logo.vue";
import { ref } from "vue";
import { validateEmail } from "@/utils";
import axios from "axios";
import { FormInput } from "@/components";
import SubmitButton from "./components/SubmitButton.vue";

const submitting = ref(false);
const errors = ref({});
const success = ref(false);
const data = ref({
  email: "",
});

const submit = async () => {
  errors.value = {};

  if (!data.email) {
    errors.value.email = "Email required";
  } else if (!validateEmail(data.email)) {
    errors.value.email = "Invalid email address";
  }

  if (Object.keys(errors.value).length === 0) {
    submitting.value = true;

    await axios
      .post("https://api.backstack.com/v1/app/forgot-password", data, { api: "backstack" })
      .then((response) => success.value = true)
      .catch((error) => errors.value = error.fields)
      .finally(() => submitting.value = false);
  }
};
</script>
