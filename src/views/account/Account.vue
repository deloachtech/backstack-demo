<template>
  <PageHeading heading="Account Profile" as-subheading>
    <template #text> Basic information about your organization. </template>
  </PageHeading>

  <Spinner v-if="fetching" />

  <div v-else>

    <Setting label="Title" :value="data.title">
      <SettingButton v-if="canUpdate" @click="setCurrentSetting('Title', 'title', data.title)" />
    </Setting>

    <Setting label="ID" :value="data.id" />

    <Setting label="Created" :value="new Date(data.created * 1000).toDateString()" />

    <Setting label="Address" :value="data.address">
      <SettingButton v-if="canUpdate" @click="setCurrentSetting('Address', 'address', data.address)" />
    </Setting>

    <Setting label="City" :value="data.city">
      <SettingButton v-if="canUpdate" @click="setCurrentSetting('City', 'city', data.city)" />
    </Setting>

    <Setting label="State/Province" :value="data.state">
      <SettingButton v-if="canUpdate" @click="setCurrentSetting('State/Province', 'state', data.state)" />
    </Setting>

    <Setting label="Zip/Postal code" :value="data.zip">
      <SettingButton v-if="canUpdate" @click="setCurrentSetting('Zip/Postal code', 'zip', data.zip)" />
    </Setting>

    <Setting label="Website URL" :value="data.url">
      <SettingButton v-if="canUpdate" @click="setCurrentSetting('Website URL', 'url', data.url)" />
    </Setting>

    <Setting label="Contact name" :value="data.contact_name">
      <SettingButton v-if="canUpdate"
        @click="setCurrentSetting('Contact name', 'contact_name', data.contact_name)" />
    </Setting>

    <Setting label="Contact email" :value="data.contact_email">
      <SettingButton v-if="canUpdate"
        @click="setCurrentSetting('Contact email', 'contact_email', data.contact_email)" />
    </Setting>

    <Setting label="Country" :value="countries.find((country) => country.id === data.country_id).title">
      <SettingButton v-if="canUpdate" @click="setCurrentSetting('Country', 'country_id', data.country_id)" />
    </Setting>

    <Setting label="Timezone"
      :value="timezones.find((timezone) => timezone.id === data.timezone_id).title">
      <SettingButton v-if="canUpdate" @click="setCurrentSetting('Timezone', 'timezone_id', data.timezone_id)" />
    </Setting>


    <Modal heading="Update Setting" :open="modalOpen" :submitting="submitting" @submit="submitData"
      @cancel="closeModal">

      <FormInput
        v-if="['title', 'address', 'city', 'state', 'zip', 'url', 'contact_name', 'contact_email'].includes(currentSetting.key)"
        :label="currentSetting.label" v-model="currentSetting.value" :error="error" />

      <FormSelect v-else-if="['country_id', 'timezone_id'].includes(currentSetting.key)"
        :help="currentSetting.key === 'timezone_id' ? 'Timezones for the currently selected country.' : ''"
        :label="currentSetting.label" v-model="currentSetting.value"
        :options="currentSetting.key === 'country_id' ? countries : timezones" :error="error" />
    </Modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import countries from "@/data/countries.json";
import { useSession } from "@/session";
import { Modal, Setting, Spinner, SettingButton, FormInput, FormSelect, PageHeading } from "@/components";
import { validateEmail } from "@/utils";

const session = useSession();
const fetching = ref(false);
const data = ref({});
const submitting = ref(false);
const timezones = ref([]);
const error = ref(null);
const currentSetting = ref(null);
const canUpdate = session.hasAccess("account-profile:u");
const modalOpen = ref(false);

const fetchData = async () => {
  fetching.value = true;

  await Promise.all([
    axios.get("https://api.backstack.com/static/timezones", { api: "backstack" }),
    axios.get("https://api.backstack.com/account", { api: "backstack" })
  ])
    .then((response) => {
      timezones.value = response[0].data;
      data.value = response[1].data;
    })
    .finally(() => fetching.value = false);
};

fetchData();

const setCurrentSetting = (label, key, value) => {
  currentSetting.value = { label: label, key: key, value: value };
  modalOpen.value = true;
}

const submitData = async () => {

  error.value = null;

  if (["title", "address", "city", "state", "zip", "contact_name", "contact_email", "country_id", "timezone_id"].includes(currentSetting.value.key)) {
    if (!currentSetting.value.value) {
      error.value = "Required value";
      return false;
    }
  }

  if(currentSetting.value.key === 'contact_email' && !validateEmail(currentSetting.value.value)) {
    error.value = "Invalid email address";
    return false;
  }

  submitting.value = true;
  await axios
    .post("https://api.backstack.com/account", { [currentSetting.value.key]: currentSetting.value.value }, { api: "backstack" })
    .then((response) => {
      data.value[currentSetting.value.key] = currentSetting.value.value ?? '';
      // Update session values that are used in the active UI (e.g. nav dropdown).
      if (currentSetting.value.key === 'title') {
        session.account.title = currentSetting.value.value;
      }
      closeModal();
    })
    .catch((error) => error.value = error.fields[currentSetting.value.key])
    .finally(() => submitting.value = false);
};


const closeModal = () => {
  error.value = null;
  modalOpen.value = false;
};
</script>
