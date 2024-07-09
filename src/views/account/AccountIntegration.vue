<template>
  <PageHeading heading="Application Modules" as-subheading>
    <template #text> Modules provide extended application functionality. </template>
  </PageHeading>

  <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
  <symbol id="arrow-right-short" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
  </symbol>
  <symbol id="x-lg" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
    <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
  </symbol>
</svg>


  <Spinner v-if="fetching" class="content-spinner" />

  <div v-else class="bva-optional-features">
    <div class="row g-5 row-cols-1 row-cols-lg-3">
      <div v-for="record in data" :key="record.feature_id" class="col d-flex align-items-start">
        <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <span v-if="optionalModules[record.human_id]?.icon" v-html="optionalModules[record.human_id].icon"></span>
        </div>
        <div>
          <h3 class="fs-3 text-body-emphasis">{{ record.title }}</h3>
          <span v-if="record.active" class="badge text-bg-success">Active</span>
          <span v-else class="badge text-bg-secondary">Inactive</span>
          <p class="text-secondary mt-2" v-if="record.description">{{ record.description }}</p>
          <button type="button" class="btn btn-outline-info">Info</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { PageHeading, Spinner } from "backstack-vue-assets";
import axios from "axios";
import optionalModules from "@/assets/data/optional-modules.json";

const fetching = ref(false);
const data = ref({});

const fetchData = async () => {
  fetching.value = true;
  await axios
    .get("https://api.backstack.com/v1/account/optional-features", { api: "backstack" })
    .then((response) => {
      console.log(response.data);
      data.value = response.data;
    })
    .finally(() => {
      fetching.value = false;
    });
};

fetchData();
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
