<script setup>
import { ref } from "vue";
import { Spinner, TableToolbar, Indicator, ActionDropdown } from "@/components";
import axios from "axios";
import { formatTimestamp, ucFirst } from "@/utils";
import DeleteNetworkInvitation from "./DeleteNetworkInvitation.vue";
import CreateNetworkInvitation from "./CreateNetworkInvitation.vue";
import { useSession } from "@/session";

const session = useSession();
const list = ref([]);
const fetching = ref(false);
const deleting = ref(false);
const creating = ref(false);
const created = ref(false);
const activeRecord = ref({});

const fetchList = async () => {
  fetching.value = true;
  await axios
      .get("https://api.backstack.com/account/networks/invitations", { api: "backstack" })
      .then((response) => list.value = response.data.list)
      .finally(() => fetching.value = false);
};

fetchList();


const handleAction = (action) => {
  if (action.key === "delete") {
    console.log("Deleting invitation", action.data);
  } else if (action.key === "view") {
    console.log("Viewing invitation", action.data);
  }
};

const deleteSuccess = ($id) => {
  deleting.value = false;
  list.value = list.value.filter((item) => item.id !== activeRecord.value.id);
  activeRecord.value = {};
};

const createSuccess = (data) => {
  creating.value = false;
  created.value = true;
  list.value.unshift(data);
};


</script>

<template>

  <p>Invitations are deleted upon activation by the account.</p>

  <Spinner v-if="fetching" />

  <div v-else class="table-responsive mt-5">
    <TableToolbar @add="creating = true" :hide-add="!session.hasAccess('account-networks:c')" />
    <table class="table table-hover table-borderless">
      <thead>
        <tr>
          <th class="d-none d-md-table-cell">Date</th>
          <th>Recipient</th>
          <th class="d-none d-md-table-cell">Domain</th>
          <th class="d-none d-md-table-cell">Fee Proposed</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in list">
          <td class="d-none d-md-table-cell">{{ formatTimestamp(record.created) }}</td>
          <td class="truncate-on-small">
            <a :href="`mailto:${record.email}`"><span>{{
                record.email }}</span></a>
          </td>
          <td class="d-none d-md-table-cell">
            {{ record.domain }}
          </td>
          <td class="d-none d-md-table-cell">{{ record.fee_proposed }}</td>
          <td>
            <Indicator :color="record.status === 'expired' ? 'danger' : 'success'" />{{ ucFirst(record.status) }}
          </td>
          <td>
            <ActionDropdown :data="record" @action="handleAction" :actions="[
              { key: 'view', text: 'View', access: '*' },
              { key: 'delete', text: 'Delete', access: 'account-network-invitations:d' },
            ].filter((item) => session.hasAccess(item.access))" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <DeleteNetworkInvitation :open="deleting" :record="activeRecord" @cancel="deleting = false"
    @success="deleteSuccess" />
  <CreateNetworkInvitation :open="creating" @cancel="creating = false" @success="createSuccess" />
</template>
