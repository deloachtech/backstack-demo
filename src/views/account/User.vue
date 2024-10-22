<template>
  <Modal :open="open" :heading="heading" @cancel="cancel" @submit="submit" :submitting="submitting">

    <div v-if="session.demo" class="alert alert-warning">User activation emails are not sent while in demo mode.</div>

    <FormInput v-model="data.name" label="Name" :error="errors.name" class="mb-3" />

    <FormInput v-model="data.email" label="Email address" :error="errors.email" type="email" class="mb-3" />

    <div v-if="showResendEmailOption" class="form-check mb-3">
      <input class="form-check-input" type="checkbox" value="" id="resend-email" />
      <label class="form-check-label" for="resend-email"> Resend email </label>
    </div>
    <div :class="[errors.roles ? '' : 'mb-3']">Roles</div>
    <div v-if="errors.roles === true" class="invalid-feedback-text mb-3">At least one role is required</div>
    <div class="" style="height: 200px; overflow-y: auto">
      <div v-if="fetching" class="d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else v-for="role in roles" class="form-check" :key="role.id">
        <input v-model="data.roles" class="form-check-input" type="checkbox" :value="role.id" :id="role.id" />
        <label class="form-check-label" :for="role.id">
          <div>{{ role.title }}</div>
          <small v-if="role.description" class="text-secondary">{{ role.description }}</small>
        </label>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref } from "vue";
import { Modal, FormInput } from "@/components";
import axios from "axios";
import { useSession } from "@/session";

const session = useSession();

const emit = defineEmits(["cancel", "submit"]);

const props = defineProps({
  open: { type: Boolean, default: false },
  heading: { type: String, default: "User" },
  submitting: { type: Boolean, default: false },
  errors: { type: Object, default: {} },
  showResendEmailOption: { type: Boolean, default: false },
});

const data = ref({
  name: "",
  email: "",
  roles: [],
  resend_email: false,
});

const roles = ref([]);
const fetching = ref(false);

const cancel = () => {
  data.value = {
    name: "",
    email: "",
    roles: [],
    resend_email: false,
  };
  emit("cancel");
};

const submit = () => {
  emit("submit", data);
};

const fetchRoles = async () => {
  fetching.value = true;
  await axios
    .get("https://api.backstack.com/app/roles", { api: "backstack" })
    .then((response) => roles.value = response.data)
    .finally(() => fetching.value = false);
};

fetchRoles();
</script>
