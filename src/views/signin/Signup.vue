<template>
  <Spinner v-if="fetching" />

  <SignupForm v-else @submit="(data) => signup(data)" :submitting="submitting" :errors="errors" :countries="countries" :domains="domains" :success="success">
    <template #logo>
      <Logo class="mb-2" />
    </template>
  </SignupForm>
</template>

<script setup>
import { SignupForm, Spinner } from "backstack-vue-assets";
import Logo from "@/template/Logo.vue";
import { ref } from "vue";
import { validateEmail } from "backstack-vue-assets/assets/js/validateEmail.js";
import countries from "backstack-vue-assets/assets/data/countries.json";
import axios from "axios";

const fetching = ref(false);
const domains = ref({});

const fetchData = async () => {
  fetching.value = true;
  await axios
    .get("https://api.backstack.com/v1/auth/signup/domains", { api: "backstack" })
    .then((response) => {
      console.log(response.data);
      domains.value = response.data;
    })
    .finally(() => {
      fetching.value = false;
    });
};

fetchData();

const submitting = ref(false);
const errors = ref({});
const success = ref(false);

const validate = (data) => {
  errors.value = {};

  if (!data.email) {
    errors.value.email = "Email required";
  } else if (!validateEmail(data.email)) {
    errors.value.email = "Invalid email address";
  }

  if (!data.name) errors.value.name = "Name required";
  if (!data.username) errors.value.username = "Username required";
  if (!data.password) errors.value.password = "Password required";
  if (!data.account_title) errors.value.account_title = "Company name required";
  if (!data.domain_id) errors.value.domain_id = "Access type required";
  if (!data.country_id) errors.value.country_id = "Country required";

  if (data.username && data.password) {
    if (data.username === data.password) {
      errors.value.password = "Password cannot be username";
    } else {
      if (data.password.length < 8) {
        errors.value.password = "Password must be at least 8 characters";
      }
      if (data.username.length < 8) {
        errors.value.username = "Username must be at least 8 characters";
      }
    }
  }
};

const signup = async (data) => {
  errors.value = {};

  validate(data);

  if (Object.keys(errors.value).length === 0) {
    submitting.value = true;

    console.log(data);
    setTimeout(() => {
      submitting.value = false;
    }, 3000);
  }
};
</script>

<style scoped></style>
