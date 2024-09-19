<template>
  <Spinner v-if="fetching" />

  <div v-else class="table-responsive">
    <table class="table table-sm table-striped">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Module</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data">
          <td>{{ formatTimestamp(row.timestamp, true) }}</td>
          <td>{{ row.title }}</td>
          <td>{{ row.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { formatTimestamp } from "@/utils";
import { Spinner } from "@/components";

const fetching = ref(false);
const data = ref({});

const fetchData = async () => {
  fetching.value = true;
  await axios
    .get("https://api.backstack.com/account/optional-features-history", { api: "backstack" })
    .then((response) => data.value = response.data)
    .finally(() => fetching.value = false);
};

fetchData();
</script>
