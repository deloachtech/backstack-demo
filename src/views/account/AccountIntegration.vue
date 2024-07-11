<template>
  <PageHeading heading="Application Modules" as-subheading>
    <template #text> Modules provide extended application functionality. </template>
  </PageHeading>

  <Spinner v-if="fetching" class="content-spinner" />

  <div v-if="data.length === 0" class="alert alert-info">There are no optional modules are available at this time. Contact support if you'd like one created for your specific requirements.</div>

  <div v-else class="bva-optional-features mb-5">
    <div :class="[data.length === 0 ? 'row-cols-1' : 'row-cols-1 row-cols-lg-3', 'row g-5']">
      <div v-for="record in data" :key="record.feature_id" class="col d-flex align-items-start">
        <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <!-- This project stores a bootstrap icon (e.g. <i class="bi bi-exclamation-circle"></i>) string as the feature.image. -->
          <span v-if="record.image" v-html="record.image"></span>
        </div>
        <div>
          <h3 class="fs-3 text-body-emphasis">{{ record.title }}</h3>
          <span v-if="record.active" class="badge text-bg-success">Active</span>
          <span v-else class="badge text-bg-secondary">Inactive</span>
          <p class="text-secondary mt-2" v-if="record.description">{{ record.description }}</p>
          <button @click="handleInfoRequest(record)" type="button" class="btn btn-outline-info">Info</button>
        </div>
      </div>
    </div>
  </div>

  <Modal :open="modal" @cancel="modal = false" @submit="submitData" :submitting="submitting" cancel-label="Close" :submit-label="modalSubmitLabel" :heading="(record.image ? record.image + ' &nbsp;' : '') + record.title">
    <div class="text-body-secondary">{{ record.description }}</div>
    <div class="mt-3 mb-3">Fee: ${{ record?.fee || 0 / 100 }}<small class="text-body-secondary fw-light">/mo</small></div>
  </Modal>
</template>

<script setup>
import { ref } from "vue";
import { PageHeading, Spinner, Modal } from "backstack-vue-assets";
import axios from "axios";

const fetching = ref(false);
const data = ref({});

const fetchData = async () => {
  fetching.value = true;
  await axios
    .get("https://api.backstack.com/v1/account/optional-features", { api: "backstack" })
    .then((response) => {
      data.value = response.data;
    })
    .finally(() => {
      fetching.value = false;
    });
};

fetchData();

const modal = ref(false);
const record = ref({});
const submitting = ref(false);
const errors = ref({});
const modalSubmitLabel = ref("Activate");

const submitData = async () => {
  errors.value = {};

  if (Object.keys(errors.value).length === 0) {
    submitting.value = true;
    await axios
      .post("https://api.backstack.com/v1/account/optional-features", { id: record.id }, { api: "backstack" })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        errors.value = error.response.data.error?.fields;
      })
      .finally(() => {
        submitting.value = false;
      });
  }
};

const handleInfoRequest = (_record) => {
  record.value = _record;
  modal.value = true;
  modalSubmitLabel.value = record.active ? "Deactivate" : "Activate";
};
</script>

<style scoped>
.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.icon-square {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
}
</style>
