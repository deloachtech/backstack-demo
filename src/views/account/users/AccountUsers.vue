<template>
  <PageHeading heading="Users">
    <template #text> Current account users. </template>

    <template #actions>
      <TableToolbar :filters="filters" @filter="filter" @search="search" @add="add" :hide-add="!session.hasAccess('account-users:*')" />
    </template>
  </PageHeading>

  <Spinner v-if="fetching" />

  <div v-else class="table-responsive">
    <table class="table table-hover table-borderless">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Roles</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in list">
          <td>
            <span v-if="record.avatar" class="user-avatar" v-html="record.avatar"></span>
            <a class="m-2" href="javascript:void(0)">{{ record.name }}</a>
          </td>
          <td>
            <a :href="`mailto:${record.email}`" class="">{{ record.email }}</a>
          </td>
          <td>{{ record.roles_csv }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <AddUser :open="addUser" @cancel="addUser = false" @success="addSuccess" />
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import AddUser from "./AddUser.vue";
import { useSession } from "@/session";
import { TableToolbar, Spinner, PageHeading } from "@/components";

const session = useSession();

const addUser = ref(false);

const fetching = ref(false);
const list = ref([]);
const filters = ref({});

const filter = (key) => {
  console.log(key);
};

const search = (query) => {
  console.log(query);
};

const add = () => {
  addUser.value = true;
};

const fetchData = async () => {
  fetching.value = true;
  await axios
    .get("https://api.backstack.com/v1/account/users", { api: "backstack" })
    .then((response) => {
      list.value = response.data.list;
      filters.value = response.data.filters;
    })
    .finally(() => fetching.value = false);
};

fetchData();

const addSuccess = (data) => {
  list.value.unshift(data);
};
</script>
