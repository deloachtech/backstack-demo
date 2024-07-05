<script setup>
// https://github.com/deloachtech/backstack-vue-assets/blob/main/src/components
import { Spinner, FormInput, DataDisplay, Modal } from "backstack-vue-assets";

import { ref } from "vue";
import axios from "axios";


const fetching = ref(false);
const data = ref({});

const fetchData = async () => {
  fetching.value = true;
  await axios
    .get("https://api.backstack.com/v1/user", { api: "backstack" })
    .then((response) => {
      data.value = [
        {
          key: "name",
          label: "Name",
          value: response.data.name,
          action: "Update",
        },
        { label: "ID", value: response.data.id },
        {
          key: "email",
          label: "Email address",
          value: response.data.email,
          action: "Update",
        },
        {
          key: "username",
          label: "Username",
          value: response.data.username,
          action: "Update",
        },
        {
          key: "password",
          label: "Password",
          value: "***************",
          action: "Update",
          metadata: { username: response.data.username },
        },
      ];
    })
    .finally(() => {
      fetching.value = false;
    });
};

fetchData();

const item = ref({});

const handleAction = (_item) => {
  // Create a deep copy of the item to avoid modifying the original data.
  item.value = JSON.parse(JSON.stringify(_item));
};

const submitting = ref(false);
const error = ref(null);

const validate = (_item) => {
  error.value = null;
  if (_item.key === "password") {
    if (_item.value.length < 8) {
      error.value = "Password must be at least 8 characters";
      return false;
    }
    if (_item.value === _item.metadata.username) {
      error.value = "Password cannot be your Username";
      return false;
    }
  } else {
    if (!_item.value) {
      error.value = "Required value";
      return false;
    }
  }

  return true;
};

const handleSubmit = (_item) => {
  if (!validate(_item)) {
    return;
  }

  submitting.value = true;
  
  setTimeout(() => {
    submitting.value = false;
  }, 2000);
  console.log("Submit triggered", item);
};

const handleCancel = (_item) => {
  error.value = null;
};
</script>

<template>
  <div v-if="fetching">
    <Spinner class="content-spinner" />
  </div>

  <div v-else>
    <DataDisplay modalId="modal1" :data="data" @action="(item) => handleAction(item)"> </DataDisplay>
    <Modal id="modal1" :loading="submitting" :item="item" @submit="(item) => handleSubmit(item)" @cancel="handleCancel(item)">
      <template #default>
        <FormInput v-if="['name', 'email', 'username'].includes(item.key)" v-model="item.value" :label="item.label" :error="error" />
        <FormInput v-else-if="item.key === 'password'" v-model="item.value" label="Password" type="password" :error="error" help="Must be 8 or more characters. Cannot be your Username." />
      </template>
    </Modal>
  </div>
</template>

<style scoped></style>
