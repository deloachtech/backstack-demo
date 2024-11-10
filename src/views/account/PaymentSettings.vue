<script setup>
import { ref } from "vue";
import { useSession } from "@/session";
import axios from "axios";
import { Spinner, Setting, Modal, FormInput, SettingButton } from "@/components";


const session = useSession();
const fetching = ref(false);
const data = ref({});

const fetch = async () => {
  fetching.value = true;
  await axios
      .get("https://api.backstack.com/account/stripe/settings", { api: "backstack" })
      .then((response) => data.value = response.data)
      .finally(() => fetching.value = false);
};

fetch();

const currentSetting = ref(null);

const setCurrentSetting = (label, key, value) => {
  currentSetting.value = { label: label, key: key, value: value };
  modalOpen.value = true;
}

const canUpdate = session.hasAccess("account-stripe-settings:u");
const submitting = ref(false);
const error = ref(null);

const modalOpen = ref(false);

const closeModal = () => {
  error.value = null;
  modalOpen.value = false;
};


const submit = async () => {

  // The API server does not require these values as this is a third-party feature.
  // If the user wants to remove the keys, they can do so.

  error.value = null;
  submitting.value = true;

  await axios
      .post("https://api.backstack.com/account/stripe/settings", { [currentSetting.value.key]: currentSetting.value.value }, { api: "backstack" })
      .then(() => {
        data.value[currentSetting.value.key] = currentSetting.value.value ?? '';
        closeModal();
      })
      // There might be some Stripe errors with the keys.
      .catch((error) => error.value = error.fields[currentSetting.value.key])
      .finally(() => submitting.value = false);
};
</script>

<template>

  <p>The following information is necessary to handle your payment activities within this application.</p>

  <Spinner v-if="fetching" />

  <div v-else class="mt-5">

    <Setting label="Public key" :value="data.public_key">
      <SettingButton v-if="canUpdate" @click="setCurrentSetting('Public key', 'public_key', data.public_key)"
        v-slot="action" />
      <template #help>
        <div>
          <p>Your Stripe public API key is used to create tokens for customer credit cards and other payment values.
            It's a publishable key that does not provide access to any sensitive information.</p>
        </div>
      </template>
    </Setting>

    <Setting label="Restricted key" :value="data.secret_key">
      <SettingButton v-if="canUpdate" @click="setCurrentSetting('Restricted key', 'secret_key', data.secret_key)" />
      <template #help>
        <div>
          <p>When you create a restricted key, this application needs permissions for the following core resources:
          </p>
          <ul>
            <li>Write permission on charges</li>
            <li>Write permission on customers</li>
            <li>Write permission on payment methods</li>
          </ul>
          <p>Alternatively, but highly discouraged, you can use your secret API key for the restricted key. (This
            will
            give this application full access to your Stripe account.)</p>
          <p>
            <a href="https://docs.stripe.com/keys" target="_blank">Learn more about Stripe keys <i
                class="bi bi-arrow-right"></i></a>
          </p>
        </div>
      </template>
    </Setting>

    <Modal heading="Update Setting" :open="modalOpen" :submitting="submitting" @submit="submit" @cancel="closeModal">

      <FormInput v-if="['public_key', 'secret_key'].includes(currentSetting.key)" :label="currentSetting.label"
        v-model="currentSetting.value" :error="error" />

    </Modal>

  </div>
</template>


