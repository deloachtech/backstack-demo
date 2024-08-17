<template>
  <User heading="Add User" :open="open" :errors="errors" :submitting="submitting" @cancel="cancel" @submit="submit" />
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { validateEmail } from "@/utils";
import User from "./components/User.vue";

const emit = defineEmits(["cancel", "success"]);

const props = defineProps({
  open: { type: Boolean, default: false },
});

const submitting = ref(false);
const errors = ref({});

const cancel = () => {
  errors.value = {};
  emit("cancel");
};

const submit = async (data) => {
  errors.value = {};
  if (!data.value.name) {
    errors.value.name = "Name required";
  }

  if (!data.value.email) {
    errors.value.email = "Email required";
  } else if (!validateEmail(data.value.email)) {
    errors.value.email = "Invalid email address";
  }

  if (data.value.roles.length === 0) {
    errors.value.roles = true;
  }

  if (Object.keys(errors.value).length > 0) {
    return;
  }

  submitting.value = true;

  await axios
    .post("https://api.backstack.com/v1/account/users", data.value, { api: "backstack" })
    .then((response) => emit("success", response.data))
    .catch((error) => errors.value = error.fields)
    .finally(() => submitting.value = false);
};
</script>
