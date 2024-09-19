<template>
  <Modal heading="Send Invitation"
    subtext="An email with activation instructions will be sent to the address provided. You'll be able to view the account once it's activated."
    :open="open" @submit="submit" :submitting="submitting" @cancel="cancel" :hide-submit-button="domains.length === 0"
    :cancel-button-text="domains.length === 0 ? 'Ok' : 'Cancel'">

    <div v-if="domains.length === 0" class="">Currently, there are no network options available for your account. Please
      check back in the future or contact support if you need additional information.
    </div>

    <div v-else class="row g-3">

      <div v-if="session.demo" class="alert alert-warning">Network invitations are not emailed in demo mode.</div>

      <div class="col-md-7">
        <FormInput label="Email address *" v-model="data.email" type="email" :error="errors.email"
          tip="An email will be sent to this address with account activation instructions." />
      </div>

      <div class="col-md-5">
        <FormInput label="Fee Proposed" v-model="data.fee_proposed" :error="errors.fee_proposed"
          tip="Optional whole number decimal (e.g. 2.25) fee percentage of system generated revenue to share. (Must be accepted by the network account.)" />
      </div>

      <div class="col-md-6">
        <FormSelect @change="domainChanged" label="Account type *" v-model="data.domain_id" :error="errors.domain_id"
          :options="domains" />
      </div>

      <div class="col-md-6">
        <div id="domainHelp" class="text-muted mt-4 small">Select an account type for additional information here.</div>
      </div>

    </div>
  </Modal>
</template>

<script setup>
import { Modal, FormInput, FormSelect } from "@/components";
import { ref } from "vue";
import axios from "axios";
import { validateEmail } from "@/utils";
import { useSession } from "@/session";


const session = useSession();

const domainChanged = (id) => {
  document.getElementById("domainHelp").innerHTML = domains.value.find((d) => d.id === id).description || "There is no additional information provided for this type of account.";
};

const emit = defineEmits(["cancel", "success"]);

const props = defineProps({
  open: { type: Boolean, required: true, default: false },
});

const submitting = ref(false);
const errors = ref({});
const data = ref({
  email: "",
  domain_id: "",
  fee_proposed: "",
});

const domains = ref([]);

const fetchDomains = async () => {
  await axios
    .get("https://api.backstack.com/account/network-domains", { api: "backstack" })
    .then((response) => domains.value = response.data);
};

fetchDomains();

const cancel = () => {
  data.value = {
    email: "",
    domain_id: "",
    fee_proposed: "",
  };
  errors.value = {};
  emit("cancel");
};

const submit = async () => {
  errors.value = {};

  if (!data.value.email) {
    errors.value.email = "Email required";
  } else if (!validateEmail(data.value.email)) {
    errors.value.email = "Invalid email address";
  }

  if (!data.value.domain_id) {
    errors.value.domain_id = "Domain required";
  }

  if (Object.keys(errors.value).length > 0) {
    return;
  }

  submitting.value = true;
  
  await axios
    .post("https://api.backstack.com/account/network-invitations", data.value, { api: "backstack" })
    .then((response) => emit("success", response.data))
    .catch((error) => errors.value = error.fields)
    .finally(() => submitting.value = false);
};
</script>
