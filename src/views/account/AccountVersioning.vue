<template>
  <PageHeading heading="Application Versions" as-subheading>
    <template #text> Versions provide extended functionality to meet the needs of your organization. </template>
  </PageHeading>

  <Spinner v-if="fetching" class="content-spinner" />

  <div v-else>
    <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
      <symbol id="check" viewBox="0 0 16 16">
        <title>Check</title>
        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
      </symbol>
    </svg>

    <!-- App versions -->

    <div :class="`row row-cols-sm-1 row-cols-md-${data.versions.length} mb-3 text-center bva-versioning`">
      <div v-for="version in data.versions" :key="version.id" class="col">
        <div :class="[version.active ? 'border-primary' : '', 'card mb-4 rounded-3 shadow-sm']">
          <div :class="[version.active ? 'text-bg-primary border-primary' : '', 'card-header py-3']">
            <h4 class="my-0 fw-normal">{{ version.title }}</h4>
          </div>
          <div class="card-body">
            <p v-if="version.description" class="text-secondary">{{ version.description }}</p>

            <h1 v-if="version.fee" class="">${{ version.fee / 100 }}<small class="text-body-secondary fw-light">/mo</small></h1>
            <h1 v-else class="">Free</h1>

            <!-- 
            The version.more_info provided in the Backstack dashboard is a pipe (|) delimited string.
            Adjust the logic below if you use a different delimiter or format.
            -->
            <ul v-if="version.more_info" class="list-unstyled mt-3 mb-4">
              <li v-for="meta in version.more_info.split('|')">{{ meta }}</li>
            </ul>

            <button v-if="version.active" type="button" class="w-100 btn btn-lg btn-outline-secondary" disabled>Active</button>
            <button v-else type="button" @click="handleInfoRequest(version)" class="w-100 btn btn-lg btn-outline-info">Info</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Feature matrix -->

    <div v-if="data.matrix">
      <h2 class="display-6 text-center mb-4">Compare features</h2>

      <div class="table-responsive">
        <table class="table text-center">
          <thead>
            <tr>
              <th v-for="(heading, index) in data.matrix.headings" :key="heading" :style="index === 0 ? 'width: 50%;' : `width: ${50 / (data.matrix.headings.length - 1)}%;`">{{ heading }}</th>
            </tr>
          </thead>

          <tbody v-for="row in data.matrix.rows" :key="row.id">
            <tr>
              <td scope="row" class="text-start fw-bold">
                {{ row.title }}
                <div v-if="row.description" class="text-start text-secondary fw-lighter">{{ row.description }}</div>
              </td>
              <td v-for="(check, index) in row.versions" :key="index">
                <svg v-if="check" class="bi" width="24" height="24"><use xlink:href="#check" /></svg>
                <span v-else>&nbsp;</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Additional modules -->

    <div v-if="data.modules_available" class="px-4 py-5 text-center">
      <div class="py-5">
        <h1 class="display-6 fw-bold">Need more functionality?</h1>
        <div class="col-lg-6 mx-auto text-secondary">
          <p class="fs-5 mb-4">Discover additional modules that can be seamlessly integrated to fulfill your unique requirements.</p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <a href="/account/integration" type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3">Explore Modules</a>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="m-5">&nbsp;</div>
  </div>

  <Modal :open="modal" @cancel="modal = false" @submit="submitData" :submitting="submitting" cancel-label="Close" submit-label="Activate" :heading="record.title">
    <div class="text-body-secondary">{{ record.description }}</div>
    <ul v-if="record.more_info" class="list-unstyled mt-3 mb-4">
      <li v-for="meta in record.more_info.split('|')">{{ meta }}</li>
    </ul>
    <div class="mt-3 mb-3">Fee: ${{ record?.fee || 0 / 100 }}<small class="text-body-secondary fw-light">/mo</small></div>
  </Modal>
</template>

<script setup>
import { PageHeading, Spinner, Modal } from "backstack-vue-assets";
import { ref } from "vue";
import axios from "axios";

const fetching = ref(false);
const data = ref({});

const fetchData = async () => {
  fetching.value = true;
  await axios
    .get("https://api.backstack.com/v1/account/versions", { api: "backstack" })
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

const submitData = async () => {
  errors.value = {};

  if (Object.keys(errors.value).length === 0) {
    submitting.value = true;
    await axios
      .post("https://api.backstack.com/v1/account/versions", { id: record.id }, { api: "backstack" })
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
};
</script>

<style scoped>
.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}
</style>
