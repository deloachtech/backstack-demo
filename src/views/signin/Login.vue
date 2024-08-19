<template>
  <SelectAccountForm v-if="accounts?.length > 0" :accounts="accounts" :last-login="lastLogin" @submit="selectAccount"
    :submitting="submitting" :errors="errors" />

  <LoginForm v-else @submit="login" :submitting="submitting" :errors="errors" />
</template>

<script setup>
import LoginForm from "./components/LoginForm.vue";
import SelectAccountForm from "./components/SelectAccountForm.vue";
import { ref } from "vue";
import { useSession } from "@/session";
import axios from "axios";
import { useRouter } from "vue-router";

const session = useSession();
const submitting = ref(false);
const errors = ref({});
const accounts = ref([]);
const lastLogin = ref(null);

const router = useRouter();

const login = async (_data) => {
  errors.value = {};

  if (!_data.username) errors.value.username = "Username required";
  if (!_data.password) errors.value.password = "Password required";

  if (Object.keys(errors.value).length === 0) {
    submitting.value = true;

    await axios
      .post("https://api.backstack.com/v1/app/login", _data, { api: "backstack" })
      .then((response) => {

        if (response.data?.select_account) {
          // https://backstack.com/login.html#selecting-accounts
          accounts.value = response.data.select_account.accounts;
          lastLogin.value = response.data.select_account.last_login;
        } else {
          session.update(response.data);
          router.push("/");
        }
      })
      .catch((error) => errors.value = error.fields)
      .finally(() => submitting.value = false);
  }
};

const selectAccount = async (data) => {
  submitting.value = true;
  await axios
    .post("https://api.backstack.com/v1/app/login-account", data, { api: "backstack" })
    .then((response) => {
      session.update(response.data);
      router.push("/");
    })
    .finally(() => submitting.value = false);
};
</script>
