<template>
  <Spinner v-if="fetching" />

  <div v-else class="table-responsive mt-5">
    <TableToolbar @add="creating = true" :hide-add="!session.hasAccess('account-networks:c')" />
    <table class="table table-hover table-borderless">
      <thead>
        <tr>
          <th>Account</th>
          <th>Type</th>
          <th class="d-none d-md-table-cell">Fee</th>
          <th class="d-none d-md-table-cell">Fee Proposed</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in list">
          <td class="truncate-on-small"> {{ record.account_title }} </td>
          <td> {{ record.domain_title }} </td>
          <td class="d-none d-md-table-cell">{{ record.fee }}</td>
          <td class="d-none d-md-table-cell">{{ record.fee_proposed }}</td>
          <td>
            <div class="dropdown">
              <button class="btn dropdown-toggle dropdown-icon" type="button" data-bs-toggle="dropdown"
                aria-expanded="false"><i class="bi bi-three-dots"></i></button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a @click.prevent="handleAction('view', record)" class="dropdown-item"
                    href="javascript:void(0)">View</a></li>
                <li v-if="session.hasAccess('account-network:d')"><a @click.prevent="handleAction('delete', record)"
                    class="dropdown-item" href="javascript:void(0)">Delete</a></li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <DeleteNetwork :open="deleting" :record="activeRecord" @cancel="deleting = false" @success="deleteSuccess" />
  <CreateNetworkInvitation :open="creating" @cancel="creating = false" @success="createSuccess" />

  <div v-if="created" class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Success!</strong> Your network invitation has been sent to the recipient for acceptance.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Spinner, TableToolbar } from "@/components";
import DeleteNetwork from "./DeleteNetwork.vue";
import CreateNetworkInvitation from "./CreateNetworkInvitation.vue";
import axios from "axios";
import { useSession } from "@/session";

const list = ref([]);
const fetching = ref(false);
const deleting = ref(false);
const creating = ref(false);
const created = ref(false);
const activeRecord = ref({});

const session = useSession();

const fetchList = async () => {
  fetching.value = true;
  await axios
    .get("https://api.backstack.com/account/networks", { api: "backstack" })
    .then((response) => list.value = response.data.list)
    .finally(() => fetching.value = false);
};

fetchList();

const handleAction = (action, record) => {
  if (action === "delete") {
    deleting.value = true;
    activeRecord.value = record;
  } else if (action === "view") {
    console.log("Viewing record", record);
  }
};

const deleteSuccess = () => {
  deleting.value = false;
  list.value = list.value.filter((item) => item?.account_id !== activeRecord.value.account_id);
  activeRecord.value = {};
};

const createSuccess = (record) => {
  creating.value = false;
  created.value = true;
};
</script>
