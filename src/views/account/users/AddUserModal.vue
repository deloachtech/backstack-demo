<template>
  <Modal :open="open" @cancel="cancel" @submit="submit" :submitting="submitting">
    <FormInput v-model="data.name" label="Name" :error="errors.name" help="The users name can be changed once they log in." />
  </Modal>
</template>

<script setup>
import { ref } from "vue";
import { FormInput, Modal } from "backstack-vue-assets";
import axios from "axios";
import { validateEmail } from "backstack-vue-assets/assets/js/validateEmail.js";

const props = defineProps({
  open: { type: Boolean, default: false },
});

const emit = defineEmits(["cancel", "complete"]);

const submitting = ref(false);
const errors = ref({});
const data = ref({
  name: "",
  email: "",
  roles: [],
});

const cancel = () => {
  errors.value = {};
  emit("cancel");
};

const submit = async () => {
  errors.value = {};
  if (!data.value.name) {
    errors.value.name = "Name required";
  }

  if (!data.email) {
    errors.value.email = "Email required";
  } else if (!validateEmail(data.email)) {
    errors.value.email = "Invalid email address";
  }

  if (Object.keys(errors.value).length > 0) {
    return;
  }

  submitting.value = true;
  setTimeout(() => {
    submitting.value = false;
    data.value = {};
  }, 2000);

  console.log(data.value);
  emit("complete");
};
</script>

<style scoped></style>
