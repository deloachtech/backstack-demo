<script setup>
import { ref } from "vue";
import { Spinner, PageHeading } from "@/components";
import axios from "axios";
import { useSession } from "@/session";
import { useRouter } from "vue-router";

const fetching = ref(false);
const submitting = ref(false);
const data = ref([]);
const session = useSession();
const accountId = ref(session.account.id);
const errors = ref({});
const router = useRouter();

const fetch = async () => {
  fetching.value = true;
  await axios
      .get("https://api.backstack.com/user/change-account", { api: "backstack" })
      .then((response) => data.value = response.data)
      .finally(() => fetching.value = false);
};

fetch();

const submit = async () => {
  if (!accountId.value) {
    errors.value.account_id = "Account required";
    return;
  }

  submitting.value = true;
  try {
    const response = await axios.post("https://api.backstack.com/user/change-account", { account_id: accountId.value }, { api: "backstack" });
    session.update(response.data);
    await router.push("/");
  } catch (error) {
    errors.value = error.fields;
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <PageHeading heading="Change Account">
    <template #text> Activate a different account for this application session. </template>
  </PageHeading>

  <Spinner v-if="fetching" />

  <div v-else-if="data.length <= 1" class="alert alert-info">You are not a member of any other application accounts.
  </div>

  <div v-else class="centered-container pt-0 pt-md-5">
    <div class="row">
      <div class="mb-3 p-0">
        <label for="account" class="form-label">Select an account to activate</label>
        <select v-model="accountId" class="form-select" aria-label="Select account">
          <option v-for="account in data" :key="account.id" :value="account.id">{{ account.title }}</option>
        </select>
      </div>
      <button v-if="submitting" type="button" disabled class="btn btn-primary"><span
          class="spinner-border spinner-border-sm" aria-hidden="true"></span>Activate</button>
      <button v-else type="button" @click="submit" class="btn btn-primary">Activate</button>
    </div></div>

</template>

<style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* min-height: calc(100vh - 20rem); */
}
</style>