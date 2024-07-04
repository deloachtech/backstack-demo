<script setup>
import { Spinner, Settings } from "backstack-vue-assets";
import { ref } from "vue";
import axios from "axios";

const fetching = ref(false);
const data = ref({});

const fetchData = async () => {
  fetching.value = true;
  await axios
    .get("https://api.backstack.com/v1/user", { api: "backstack" })
    .then((response) => {
      data.value = response.data;
    })
    .finally(() => {
      fetching.value = false;
    });
};

fetchData();
</script>

<template>
  <div v-if="fetching">
    <Spinner class="content-spinner" />
  </div>

  <div v-else>
    <Settings
      :data="[
        {
          key: 'name',
          label: 'Name',
          value: data.name,
          action: 'Update',
        },
        {
          label: 'ID',
          value: data.id,
        },
        {
          key: 'email',
          label: 'Email address',
          value: data.email,
          action: 'Update',
        },
        {
          key: 'attachments',
          label: 'Attachments',
        },
      ]"
    >
      <template #attachments="{ item }">
        <ul class="list-group">
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <div class="d-flex align-items-center">
              <i class="bi bi-paperclip me-2"></i>
              <span class="me-auto">resume_back_end_developer.pdf</span>
              <span class="badge bg-secondary rounded-pill">2.4mb</span>
            </div>
            <div class="ms-4">
              <button type="button" class="btn btn-outline-primary btn-sm me-2">
                Update
              </button>
              <button type="button" class="btn btn-outline-secondary btn-sm">
                Remove
              </button>
            </div>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <div class="d-flex align-items-center">
              <i class="bi bi-paperclip me-2"></i>
              <span class="me-auto">coverletter_back_end_developer.pdf</span>
              <span class="badge bg-secondary rounded-pill">4.5mb</span>
            </div>
            <div class="ms-4">
              <button type="button" class="btn btn-outline-primary btn-sm me-2">
                Update
              </button>
              <button type="button" class="btn btn-outline-secondary btn-sm">
                Remove
              </button>
            </div>
          </li>
        </ul>
      </template>
    </Settings>
  </div>
</template>

<style scoped></style>
