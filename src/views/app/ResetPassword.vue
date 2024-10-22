<template>
  <Spinner v-if="loading" />

  <form novalidate @submit.prevent="submit" class="signin-form">
    <div class="text-center">
      <Logo class="mb-2" />
    </div>

    <h2 class="h4 mb-3 fw-normal text-center">{{ success ? "Success!" : "Reset password" }}</h2>

    <div v-if="!data.token" class="text-center">
      <p>Invalid or expired reset password link. Please <a href="/forgot-password">request a new one</a>.</p>
    </div>
    <div v-else>
      <div v-if="success" class="text-center">
        <p>Your can <a href="/login">log in</a> with your new password.</p>
      </div>

      <div v-else>
        <FormInput label="New Password" v-model="data.password" :error="errors.password" type="password" />

        <FormInput label="Confirm new password" v-model="data.confirm_password" :error="errors.confirm_password" type="password"
          class="mt-3 mb-3" />

        <SubmitButton :submitting="submitting" text="Reset Password" />

        <div class="mt-3 mb-3 text-body-secondary text-center">
          <div class="mt-2"><a href="/login">Remembered password?</a></div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import Logo from "@/template/Logo.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { Spinner, FormInput } from "@/components";
import SubmitButton from "@/views/app/components/LoginSubmitButton.vue";

const loading = ref(false);
const submitting = ref(false);
const errors = ref({});
const route = useRoute();
const success = ref(false);

const data = ref({
  password: "",
  confirm_password: "",
  token: "",
});


/**
 * Validate the token if it's provided in the URL.
 * This is an optional step if you want to check the token before rendering the form.
 * @see https://backstack.com/reset-passwords#preflight-token-validation
 */
const validateToken = async () => {
  if (!route.query.token) return;
  loading.value = true;
  await axios
    .get(`https://api.backstack.com/app/reset-password/${route.query.token}`, {
      api: "backstack",
      // Suppress the alert message if the token is invalid so the ResetPassword component can handle it.
      alert: false,
    })
    .then((response) => data.value.token = response.data.token)
    .catch((error)=>errors.value = error.fields)
    .finally(() => loading.value = false);
};

onMounted(() => {
  validateToken();
});

const submit = async () => {
  errors.value = {};

  // Do some basic validation. The API does more and will return an error if the data is invalid.

  if (!data.value.password) {
    errors.value.password = "Password required";
  }
  if (!data.value.confirm_password) {
    errors.value.confirm_password = "Password confirmation required";
  }
  if (data.value.password && data.value.confirm_confirm && data.value.password !== data.value.confirm_password) {
    errors.value.confirm_password = "Passwords do not match";
  }

  if (Object.keys(errors.value).length === 0) {
    submitting.value = true;

    await axios
      .post("https://api.backstack.com/app/reset-password", data.value, { api: "backstack" })
      .then(() => success.value = true)
      .catch((error) => errors.value = error.fields)
      .finally(() => submitting.value = false);
  }
};
</script>
