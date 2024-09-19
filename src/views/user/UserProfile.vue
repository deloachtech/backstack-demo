<template>
  <PageHeading heading="User Profile">
    <template #text> Basic information about you. </template>
  </PageHeading>

  <Spinner v-if="fetching" />

  <div v-else>

    <Setting label="Name" :value="data.name">
      <SettingButton @click="setCurrentSetting('Name', 'name', data.name)" />
    </Setting>

    <Setting label="ID" :value="data.id" />

    <Setting label="Created" :value="new Date(data.created * 1000).toDateString()" />

    <Setting label="Email" :value="data.email">
      <SettingButton @click="setCurrentSetting('Email', 'email', data.email)" />
    </Setting>

    <Setting label="Username" :value="data.username">
      <SettingButton @click="setCurrentSetting('Username', 'username', data.username)" />
    </Setting>

    <Setting label="Avatar" :value="data.avatar">
      <template #value>
        <span id="avatar" v-html="data.avatar" class="user-avatar"></span>
      </template>
      <SettingButton @click="setCurrentSetting('Avatar color', 'avatar_color', data.avatar_color)" />
    </Setting>

    <Modal heading="Update Setting" :open="modalOpen" :submitting="submitting" @submit="submitData"
      @cancel="closeModal">

      <FormInput v-if="['name', 'email', 'username'].includes(currentSetting.key)" v-model="currentSetting.value"
        :label="currentSetting.label" :error="error" />

      <div v-if="currentSetting.key === 'avatar_color'">
        <label for="avatar_color" class="form-label">{{ currentSetting.label }}</label>
        <div class="d-flex justify-content-center align-items-center">
          <input type="color" class="form-control form-control-color mt-2 mt-md-0" v-model="currentSetting.value"
            id="avatar_color">
        </div>
      </div>

    </Modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { Spinner, PageHeading, Modal, FormInput, Setting, SettingButton } from "@/components";
import { useSession } from "@/session";
import { validateEmail } from "@/utils";

const fetching = ref(false);
const data = ref({});
const session = useSession();
const item = ref({});
const submitting = ref(false);
const error = ref(null);
const modalOpen = ref(false);
const currentSetting = ref(null);

const fetchData = async () => {
  fetching.value = true;
  await axios
    .get("https://api.backstack.com/user", { api: "backstack" })
    .then((response) => data.value = response.data)
    .finally(() => fetching.value = false);
};

fetchData();


const setCurrentSetting = (label, key, value) => {
  currentSetting.value = { label: label, key: key, value: value };
  modalOpen.value = true;
}

const submitData = async () => {
  error.value = null;

  if (currentSetting.value.key === "email" && !validateEmail(currentSetting.value.value)) {
    error.value = "Invalid email address";
    return;
  }

  if (currentSetting.value.key === "username" && currentSetting.value.value < 8) {
    error.value = "Username must be at least 8 characters.";
    return;
  }

  if (currentSetting.value.key === "name" && currentSetting.value.value) {
    error.value = "Name required";
    return;
  }

  submitting.value = true;
  await axios
    .post("https://api.backstack.com/user", { [currentSetting.value.key]: currentSetting.value.value }, { api: "backstack" })
    .then((response) => {
      data.value[currentSetting.value.key] = currentSetting.value.value ?? '';

      // The API response id the user object.
      // Update session values that are used in the active UI (e.g. nav dropdown).
      
      if (currentSetting.value.key === 'name') {
        session.user.name = currentSetting.value.value;
      }else if (currentSetting.value.key === 'avatar_color') {
        session.user.avatar = response.data.avatar;
        session.user.avatar_color = response.data.avatar_color;
      } 
      closeModal();
    })
    .finally(() => submitting.value = false);
};


const closeModal = () => {
  error.value = null;
  modalOpen.value = false;
};
</script>

<style scoped></style>
