<template>
  <Spinner v-if="fetching" />

  <div v-else class="table-responsive">
    <table class="table table-sm table-striped">
      <thead>
        <tr>
          <th class="d-none d-md-table-cell">Date</th>
          <th>Version</th>
          <th>Active Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data">
          <td class="d-none d-md-table-cell">{{ formatTimestamp(row.timestamp, true) }}</td>
          <td>{{ row.title }}</td>
          <td>{{ formatSecondsDuration(row.active_seconds) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { formatTimestamp, formatSecondsDuration } from "@/utils";
import { Spinner } from "@/components";

const fetching = ref(false);
const data = ref({});

const fetchData = async () => {
  fetching.value = true;
  await axios
    .get("https://api.backstack.com/v1/account/version-history", { api: "backstack" })
    .then((response) => data.value = response.data)
    .finally(() => fetching.value = false);
};

fetchData();
</script>
