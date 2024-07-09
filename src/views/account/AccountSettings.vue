<template>
  <PageHeading heading="General Settings" as-subheading>
    <template #text> Basic information about your organization. </template>
  </PageHeading>

  <div v-if="fetching">
    <Spinner class="content-spinner" />
  </div>

  <div v-else>
    <DataDisplay :data="data" @action="(item) => handleAction(item)">
      <template #country_id="{ item }">{{ item.value }}</template>
      <template #timezone_id="{ item }">{{ item.value }}</template>
    </DataDisplay>

    <Modal :open="modalOpen" :submitting="submitting" @submit="submitData" @cancel="closeModal">
      <FormInput v-if="['title', 'address', 'city', 'state', 'zip', 'url', 'contact_name', 'contact_email'].includes(item.key)" v-model="item.value" :label="item.label" :error="error" :help="item.help" />

      <FormSelect v-else-if="['country_id', 'timezone_id'].includes(item.key)" v-model="item.value" :label="item.label" :error="error" :help="item.help" :options="item.key === 'country_id' ? countriesWithLabels : timezones" />
    </Modal>
  </div>
</template>

<script setup>
import { Spinner, FormInput, DataDisplay, Modal, FormSelect, PageHeading } from "backstack-vue-assets";
import { ref, computed } from "vue";
import axios from "axios";
import countries from "backstack-vue-assets/assets/data/countries.json";
import { useSession } from "backstack-vue-assets/stores/session.js";

const session = useSession();

// Add a label property to each country object.
let countriesWithLabels = computed(() =>
  countries.map((country) => ({
    ...country,
    label: country.title,
  }))
);

const fetching = ref(false);
const data = ref({});

const fetchData = async () => {
  fetching.value = true;
  await axios
    .get("https://api.backstack.com/v1/account", { api: "backstack" })
    .then((response) => {
      data.value = [
        { key: "title", label: "Title", value: response.data.title, action: "Update", access: "*" },
        { label: "ID", value: response.data.id },
        { label: "Created", value: new Date(response.data.created * 1000).toDateString(), access: "*" },
        { key: "address", label: "Address", value: response.data.address, action: "Update", access: "*" },
        { key: "city", label: "City", value: response.data.city, action: "Update", access: "*" },
        { key: "state", label: "State/Province", value: response.data.state, action: "Update", access: "*" },
        { key: "zip", label: "Zip/Postal code", value: response.data.zip, action: "Update", access: "*" },
        { key: "url", label: "Website URL", value: response.data.url, action: "Update", access: "*" },
        { key: "contact_name", label: "Contact name", value: response.data.contact_name, action: "Update", access: "*" },
        { key: "contact_email", label: "Contact email", value: response.data.contact_email, action: "Update", access: "*" },
        { key: "country_id", label: "Country", value: response.data.country_id, action: "Update", access: "*" },
        { key: "timezone_id", label: "Timezone", value: response.data.timezone_id, action: "Update", access: "*", help: "Timezones for the currently selected country." },
      ].filter((item) => session.hasAccess(item.access));
    })
    .finally(() => {
      fetching.value = false;
    });
};

fetchData();

const item = ref({});
const submitting = ref(false);
const error = ref(null);

const submitData = async () => {
  error.value = null;
  if (["title","address","city", "state", "zip","contact_name", "contact_email","country_id","timezone_id"].includes(item.value.key)) {
    if (!item.value.value) {
      error.value = "Required value";
      return false;
    }
  }

  submitting.value = true;
  await axios
    .post("https://api.backstack.com/v1/account", { [item.value.key]: item.value.value }, { api: "backstack" })
    .then((response) => {
      data.value.map((d) => {
        if (d.key === item.value.key) {
          d.value = response.data[item.value.key];
        }
      });
      closeModal();
    })
    .catch((error) => {
      error.value = error.response.data.error?.fields[item.value.key];
    })
    .finally(() => {
      submitting.value = false;
    });
};

const fetchingTimezones = ref(false);
const timezones = ref([]);

const fetchTimezones = async () => {
  fetchingTimezones.value = true;
  await axios
    .get("https://api.backstack.com/v1/static/timezones/enumerated?title=label")
    .then((result) => {
      timezones.value = result.data;
    })
    .finally(() => {
      fetchingTimezones.value = false;
    });
};

const modalOpen = ref(false);

const handleAction = (_item) => {
  // Create a deep copy of the item to avoid modifying the original data.
  item.value = JSON.parse(JSON.stringify(_item));
  if (_item.key === "timezone_id") {
    fetchTimezones();
  }
  modalOpen.value = true;
};

const closeModal = () => {
  error.value = null;
  modalOpen.value = false;
};
</script>

<style scoped></style>
