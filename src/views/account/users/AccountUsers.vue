<template>
    <PageHeading heading="Users" as-subheading>
      <template #text> Current account users. </template>

      <template #actions>
        <input class="form-control" type="search" placeholder="Search" aria-label="Search" />

        <Dropdown label='<i class="bi bi-funnel"></i> All' :options="[{ label: 'google.com', href: 'https://google.com' }, { label: 'Active', foo: 'bar' }, { label: 'Inactive' }]" @click="(option) => console.log(option)" />

        <button type="button" @click="addUser = true" class="btn btn-primary">Add</button>
      </template>
    </PageHeading>

  <div v-if="fetching" class="d-flex justify-content-center">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

    <Table v-else :list="list" :columns="cols">
      <template #name="{ record }">
        <span v-if="record.avatar" class="user-avatar" v-html="record.avatar"></span>
        <a class="m-2" href="javascript:void(0)">{{ record.name }}</a>
      </template>
      <template #email="{ record }">
        <a :href="`mailto:${record.email}`" class="">{{ record.email }}</a>
      </template>
    </Table>

    <AddUserModal :open="addUser" @cancel="addUser = false" @complete="" />
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { PageHeading, Dropdown, Table } from "backstack-vue-assets";
import AddUserModal from "./AddUserModal.vue";
import { useSession } from "backstack-vue-assets/stores/session.js";

const session = useSession();

const addUser = ref(false);

const fetching = ref(false);
const list = ref([]);

const fetchData = async () => {
  fetching.value = true;
  await axios
    .get("https://api.backstack.com/v1/account/users", { api: "backstack" })
    .then((response) => {
      list.value = response.data.list || [];
    })
    .finally(() => {
      fetching.value = false;
    });
};

fetchData();

const cols = ref([
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "roles_csv", label: "Roles", class: "table-cell-hide-on-small" },
]);
</script>

<style scoped></style>
