<template>
  <form novalidate @submit.prevent="emit('submit', data)" class="signin-form bva-signin-form">
    <div class="text-center">
      <Logo class="mb-2" />
    </div>

    <h2 class="h4 mb-3 fw-normal text-center">Log In</h2>

    <div v-if="accounts?.length > 0">
      <p class="text-secondary">You're a member of multiple accounts. Please choose the one you want to activate.</p>
      <FormSelect v-model="data.account_id" :options="accounts" />

      <SubmitButton :submitting="submitting" text="Activate" />
    </div>

    <div v-else class="text-center">
      <p>A system error occurred. Please try again later.</p>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import SubmitButton from "./SubmitButton.vue";
import { FormSelect } from "@/components";
import Logo from "@/template/Logo.vue";

const emit = defineEmits(["submit"]);

const props = defineProps({
  submitting: {
    type: Boolean,
    default: false,
  },
  accounts: {
    type: Array,
    default: [],
  },
  lastLogin: {
    type: String,
    default: "",
  }
});

//const accounts = props.accounts ? Object.entries(props.accounts).map(([k, v]) => ({ id: k, title: v })) : [];

const data = ref({
  account_id: props.lastLogin || (accounts.length ? accounts[0].id : ""),
});
</script>

<style scoped></style>
