<template>

  <form v-if="accounts?.length > 0" novalidate @submit.prevent="selectAccount" class="signin-form">
    <div class="text-center">
      <Logo class="mb-2" />
    </div>

    <h2 class="h4 mb-3 fw-normal text-center">Log In</h2>

    <div v-if="accounts?.length > 0">
      <p class="text-secondary">You're a member of multiple accounts. Please choose the one you want to activate.</p>

      <select v-model="selectedAccountId" class="form-select" aria-label="Select account">
        <option v-for="account in accounts" :key="account.id" :value="account.id">{{ account.title }}</option>
      </select>

      <SubmitButton :submitting="submitting" text="Activate" />
    </div>

    <div v-else class="text-center">
      <p>A system error occurred. Please try again later.</p>
    </div>
  </form>


  <form v-else novalidate @submit.prevent="login" class="signin-form">
    <div class="text-center">
      <Logo class="mb-2" />
    </div>

    <h2 class="h4 mb-3 fw-normal text-center">Log In</h2>

    <FormInput label="Username" v-model="loginData.username" :error="errors.username" />

    <FormInput label="Password" v-model="loginData.password" :error="errors.password" type="password" class="mt-3" />

    <div v-if="allowRememberMe" class="form-check text-start mt-3">
      <input v-model="loginData.rememberMe" class="form-check-input" type="checkbox" value="remember-me"
        id="flexCheckDefault" />
      <label class="form-check-label" for="flexCheckDefault"> Remember me </label>
    </div>
    <div v-else class="mt-3">{{ " " }}</div>

    <SubmitButton :submitting="submitting" text="Log In" />

    <div class="mt-3 mb-3 text-body-secondary text-center">
      <div><a href="/forgot-password">Forgot your password?</a></div>
      <div v-if="session.app?.allow_signup" class="mt-2"><a href="/signup">Need an account?</a></div>
    </div>
  </form>


</template>

<script setup>
import { ref } from "vue";
import { useSession } from "@/session";
import axios from "axios";
import { useRouter } from "vue-router";
import { FormInput } from "@/components";
import SubmitButton from "./components/SubmitButton.vue";
import Logo from "@/template/Logo.vue";


const session = useSession();
const submitting = ref(false);
const errors = ref({});
const accounts = ref([]);
const router = useRouter();
const allowRememberMe = false;

const loginData = ref({
  username: session.demo ? "demo" : "",
  password: session.demo ? "demo" : "",
  rememberMe: false,
});


const selectedAccountId = ref("");

const login = async () => {
  errors.value = {};

  if (!loginData.value.username) errors.value.username = "Username required";
  if (!loginData.value.password) errors.value.password = "Password required";

  if (Object.keys(errors.value).length === 0) {
    submitting.value = true;

    await axios
      .post("https://api.backstack.com/v1/app/login", loginData.value, { api: "backstack" })
      .then((response) => {

        if (response.data?.select_account) {

          console.log(response.data);

          //  data.value.account_id = props.lastLogin || (props.accounts.length ? props.accounts[0].id : "");
          const _accounts = response.data.select_account.accounts;
          accounts.value = _accounts;
          const lastLogin = response.data.select_account.last_login;
          selectedAccountId.value = lastLogin || (_accounts.length ? _accounts[0].id : "");
        } else {
          session.update(response.data);
          router.push({ name: 'home' });
        }
      })
      .catch((error) => errors.value = error.fields)
      .finally(() => submitting.value = false);
  }
};

const selectAccount = async () => {
  submitting.value = true;
  await axios
    .post(`https://api.backstack.com/v1/app/login/account/acc_1234567891`, null, { api: "backstack" })
    .then((response) => {

      console.log(response.data);

      session.update(response.data);
      alert(response.data.account.id)
      router.push({ name: 'home' });
    })
    .catch((error) => alert(error.message))
    .finally(() => submitting.value = false);
};
</script>
