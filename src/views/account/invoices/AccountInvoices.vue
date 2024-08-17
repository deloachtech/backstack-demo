<template>
  <Spinner v-if="fetching" />

  <div v-else>
    <div v-if="list?.length === 0" class="alert alert-info">There are no invoices.</div>

    <div v-else class="table-responsive">
      <TableToolbar hide-add />
      <table class="table table-hover table-borderless">
        <thead>
          <tr>
            <th class="d-none d-md-table-cell">Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in list">
            <td class="d-none d-md-table-cell">{{ formatTimestamp(record.created) }}</td>
            <td>{{ record.description }}</td>
            <td>${{ record.amount / 100 }}</td>
            <td>
              <Indicator
                :color="record.status === 'paid' ? 'success' : (record.status === 'overdue' ? 'danger' : 'warning')" />
              {{ ucFirst(record.status) }}
            </td>
            <td>
              <ActionDropdown :data="record" @action="handleAction" :actions="[
                { key: 'view', text: 'View', access: '*' },
                { key: 'pay', text: 'Make payment', access: 'account-invoices:u', disabled: record.status === 'paid' },
              ].filter((item) => session.hasAccess(item.access))" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { formatTimestamp, ucFirst } from "@/utils";
import { useSession } from "@/session";
import { Spinner, TableToolbar, Indicator, ActionDropdown } from "@/components";

const session = useSession();
const fetching = ref(false);
const list = ref([]);

const fetchData = async () => {
  fetching.value = true;
  await axios
    .get("https://api.backstack.com/v1/account/invoices", { api: "backstack" })
    .then((response) => list.value = response.data.list)
    .finally(() => fetching.value = false);
};

fetchData();

const handleAction = (action) => {
  if (action.key === "pay") {
    console.log("Making payment for invoice", action.data);
  } else if (action.key === "view") {
    console.log("Viewing invoice", action.data);
  }
};
</script>
