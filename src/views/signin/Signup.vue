<template>
  <div v-if="fetching" class="d-flex justify-content-center">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <form v-else novalidate @submit.prevent="submit" class="signin-form">
    <div class="text-center">
      <Logo class="mb-2" />
    </div>

    <h2 class="h4 mb-3 fw-normal text-center">{{ success ? "Success!" : "Sign Up" }}</h2>

    <div v-if="success" class="text-center">
      <p>Check your email for account activation instructions.</p>
    </div>

    <div v-else>
      <FormInput placeholder="Name" id="name" v-model="data.name" :error="errors.name" />
      <FormInput id="email" placeholder="Email" v-model="data.email" :error="errors.email" type="email" class="mt-3" />
      <FormInput placeholder="Username" id="username" v-model="data.username" :error="errors.username" class="mt-3" />
      <FormInput placeholder="Password" id="password" v-model="data.password" :error="errors.password" type="password"
        class="mt-3" />
      <FormInput placeholder="Company" id="account_title" v-model="data.account_title" :error="errors.account_title"
        class="mt-3" />
      <div v-if="1 === 2" class="dropdown mt-3 w-100">
        <button :class="[errors?.domain_id ? 'invalid-border' : '', 'btn btn-secondary dropdown-toggle w-100']"
          type="button" data-bs-toggle="dropdown" aria-expanded="false">Account type {{ selectedDomain.title ? ": " +
            selectedDomain.title : "" }}{{ " " }}</button>
        <ul class="dropdown-menu w-100">
          <li v-for="domain in domains" :key="domain.id">
            <a @click.prevent="handleClick(domain)" class="dropdown-item mt-1" href="javascript:void(0)">{{
              domain.signup_help
                ? `${domain.title} -
              ${domain.signup_help}`
                : domain.title
            }}</a>
          </li>
        </ul>
        <div v-if="errors?.domain_id?.length > 0" class="invalid-text">
          {{ errors.domain_id }}
        </div>
      </div>

      <SelectDomain v-if="domains.length > 1" class="mt-3" placeholder="Access type" :options="domains"
        :error="errors.domain_id" @select="(option) => {
            handleDomainClick(option);
          }
          " help="Select the option that best suits your app usage." />

      <FormSelect id="country_id" placeholder="Country" v-model="data.country_id" :error="errors.country_id"
        :options="countries" class="mt-3 mb-3" />

      <SubmitButton :submitting="submitting" text="Create Account" />

      <div class="mt-3 mb-3 text-body-secondary text-center">
        <div><a :href="loginRoute">Already have an account?</a></div>
      </div>
    </div>
  </form>
</template>

<script setup>
import Logo from "@/template/Logo.vue";
import { ref, computed } from "vue";
import { validateEmail } from "@/utils";
import countries from "@/data/countries.json";
import axios from "axios";
import SelectDomain from "./components/SelectDomain.vue";
import SubmitButton from "./components/SubmitButton.vue";
import { FormInput, FormSelect } from "@/components";

const fetching = ref(false);
const _domains = ref({});

const fetchData = async () => {
  fetching.value = true;
  await axios
    .get("https://api.backstack.com/v1/app/signup/domains", { api: "backstack" })
    .then((response) => _domains.value = response.data)
    .finally(() => fetching.value = false);
};

fetchData();

const submitting = ref(false);
const errors = ref({});
const success = ref(false);

// Format domains for the SelectExtended component
const domains = computed(() => {
  return domains.map((domain) => ({
    id: domain.id,
    label: domain.title,
    text: domain.signup_help,
  }));
});

const data = ref({
  username: "",
  password: "",
  email: "",
  account_title: "",
  name: "",
  country_id: "",
  domain_id: domains.value.length === 1 ? domains.value[0].id : "",
});

const handleDomainClick = (option) => {
  //  selectedDomain.value = domain;

  data.value.domain_id = option.id;
};

const validate = () => {
  errors.value = {};

  if (!data.value.email) {
    errors.value.email = "Email required";
  } else if (!validateEmail(data.value.email)) {
    errors.value.email = "Invalid email address";
  }

  if (!data.value.name) errors.value.name = "Name required";
  if (!data.value.username) errors.value.username = "Username required";
  if (!data.value.password) errors.value.password = "Password required";
  if (!data.value.account_title) errors.value.account_title = "Company name required";
  if (!data.value.domain_id) errors.value.domain_id = "Access type required";
  if (!data.value.country_id) errors.value.country_id = "Country required";

  if (data.value.username && data.value.password) {
    if (data.value.username === data.value.password) {
      errors.value.password = "Password cannot be username";
    } else {
      if (data.value.password.length < 8) {
        errors.value.password = "Password must be at least 8 characters";
      }
      if (data.value.username.length < 8) {
        errors.value.username = "Username must be at least 8 characters";
      }
    }
  }
};

const submit = async () => {
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
