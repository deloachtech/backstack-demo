<template>
  <form novalidate @submit.prevent="emit('submit', data)" class="signin-form bva-signin-form">
    <div class="text-center">
      <Logo class="mb-2" />
    </div>

    <h2 class="h4 mb-3 fw-normal text-center">Log In</h2>

    <FormInput label="Username" v-model="data.username" :error="errors.username" />

    <FormInput label="Password" v-model="data.password" :error="errors.password" type="password" class="mt-3" />

    <div v-if="allowRememberMe" class="form-check text-start mt-3">
      <input v-model="data.rememberMe" class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
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
import SubmitButton from "./SubmitButton.vue";
import { FormInput } from "@/components";
import { useSession } from "@/session";
import Logo from "@/template/Logo.vue";

const session = useSession();

const emit = defineEmits(["submit"]);

const props = defineProps({
  submitting: {
    type: Boolean,
    default: false,
  },
  allowRememberMe: {
    type: Boolean,
    default: false,
  },
  errors: {
    type: Object,
    default: {},
  },
});

const data = ref({
  username: session.demo ? "demo" : "",
  password: session.demo ? "demo" : "",
  rememberMe: false,
});
</script>

<style scoped></style>
