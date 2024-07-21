<template>
  <PageHeading heading="Invoices" as-subheading>
    <template #text> Your account invoices. </template>
    <template #actions>
      <input class="form-control" type="search" placeholder="Search" aria-label="Search" />
      <Dropdown label='<i class="bi bi-funnel"></i> All' :options="[{ label: 'google.com', href: 'https://google.com' }, { label: 'Active', foo: 'bar' }, { label: 'Inactive' }]" @click="(option) => console.log(option)" />
    </template>
  </PageHeading>

  <div v-if="fetching" class="d-flex justify-content-center">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-else>
    <div v-if="list?.length === 0" class="alert alert-info">There are no invoices.</div>
    <Table v-else :list="list" :cols="cols"> </Table>
  </div>
</template>

<script setup>
import { PageHeading, Dropdown, Table } from "backstack-vue-assets";
import axios from "axios";
import { ref } from "vue";
import { useSession } from "backstack-vue-assets/stores/session.js";

const session = useSession();
const fetching = ref(false);
const list = ref([]);

const fetchData = async () => {
  fetching.value = true;
  await axios
    .get("https://api.backstack.com/v1/account/invoices", { api: "backstack" })
    .then((response) => {
      list.value = response.data.list || [];
    })
    .finally(() => {
      fetching.value = false;
    });
};

fetchData();

const cols = ref([
  { key: "date", label: "Date" },
  { key: "id", label: "ID" },
  { key: "status", label: "Status" },
  { key: "title", label: "Title", class: "table-cell-hide-on-small" },
  { key: "description", label: "Title", class: "table-cell-hide-on-small" },
]);
</script>

<style scoped></style>
