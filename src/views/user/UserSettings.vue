<template>
  <PageHeading heading="General Settings" as-subheading>
    <template #text> Basic information about you. </template>
  </PageHeading>

  <div v-if="fetching" class="d-flex justify-content-center">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-else>
    <DataDisplay :data="data" @action="(item) => handleAction(item)">
      <template #avatar="{ item }">
        <span v-html="item.value" class="user-avatar"></span>
      </template>
    </DataDisplay>

    <Modal :open="modalOpen" :submitting="submitting"  @submit="submitData" @cancel="closeModal">
      <FormInput v-if="['name', 'email', 'username'].includes(item.key)" v-model="item.value" :label="item.label" :error="error" />
      <FormInput v-else-if="item.key === 'password'" v-model="item.value" label="Password" type="password" :error="error" help="Must be 8 or more characters. Cannot be your Username." />
    </Modal>
  </div>
</template>

<script setup>
import { FormInput, DataDisplay, Modal, PageHeading } from "backstack-vue-assets";
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
        { key: "name", label: "Name", value: response.data.name, action: "Update" },
        { label: "ID", value: response.data.id },
        { label: "Created", value: new Date(response.data.created * 1000).toDateString() },
        { key: "email", label: "Email address", value: response.data.email, action: "Update" },
        { key: "avatar", label: "Avatar", value: response.data.avatar },
        { key: "username", label: "Username", value: response.data.username, action: "Update" },
        { key: "password", label: "Password", value: "***************", action: "Update", metadata: { username: response.data.username } },
      ];
    })
    .finally(() => {
      fetching.value = false;
    });
};

fetchData();

const item = ref({});
const submitting = ref(false);
const error = ref(null);

const submitData = async () => {
  error.value = null;
  if (item.value.key === "password") {
    if (!item.value.value || item.value.value.length < 8) {
      error.value = "Password must be at least 8 characters";
      return false;
    }
    if (item.value.value === item.value.metadata.username) {
      error.value = "Password cannot be your Username";
      return false;
    }
  } else {
    if (!item.value.value) {
      error.value = "Required value";
      return false;
    }
  }

  submitting.value = true;
  await axios
    .post("https://api.backstack.com/v1/user", { [item.value.key]: item.value.value }, { api: "backstack" })
    .then((response) => {
      data.value.map((d) => {
        if (d.key === item.value.key) {
          d.value = response.data[item.value.key];
        }
      });
      closeModal();
    })
    .finally(() => {
      submitting.value = false;
    });
};

const modalOpen = ref(false);

const handleAction = (_item) => {
  // Create a deep copy of the item to avoid modifying the original data.
  item.value = JSON.parse(JSON.stringify(_item));
  modalOpen.value = true;
};

const closeModal = () => {
  error.value = null;
  modalOpen.value = false;
};
</script>

<style scoped></style>
