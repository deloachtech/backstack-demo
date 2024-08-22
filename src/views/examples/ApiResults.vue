<template>
  <PageHeading heading="API Results">

    <template #text>
      These API results are available here for easy access and to show the data returned. There are many more API
      endpoints available in the <ExternalLink href="https://backstack.com" text="Backstack API documentation" />.
    </template>

    <template #actions>
      <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Request
        </button>
        <ul class="dropdown-menu">
          <li v-for="k, v in uris" :key="k"><a @click.prevent="handleClick(k, v)" class="dropdown-item"
              href="javascript:void(0)">{{ v }}</a></li>
        </ul>
      </div>
    </template>

  </PageHeading>

  <Spinner v-if="fetching" />

  <div v-else-if="uri">

    <table>
      <tr>
        <td style="padding-right: 1em;">Request:</td>
        <td>{{ selected }}</td>
      </tr>
      <tr>
        <td style="padding-right: 1em;">URI:</td>
        <td>{{ uri }}</td>
      </tr>
    </table>
    <pre class="opacity-50">{{ JSON.stringify(result,'', 2) }}</pre>


  </div>

  <div v-else>
    <p>Select a request from the dropdown to see the API result.</p>
  </div>

 
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { PageHeading, Spinner, ExternalLink } from "@/components";

const fetching = ref(false);
const uri = ref(null)
const result = ref(null);
const selected = ref(null);

const uris = {
  "App session": "https://api.backstack.com/v1/app/session",
  "App versions": "https://api.backstack.com/v1/app/versions",
  "App modules": "https://api.backstack.com/v1/app/optional-features",
  "User profile": "https://api.backstack.com/v1/user",
  "User notification settings": "https://api.backstack.com/v1/user/notification-settings",
  "Account profile": "https://api.backstack.com/v1/account",
  "Account payment settings": "https://api.backstack.com/v1/account/stripe/settings",
  "Account payment stats":"https://api.backstack.com/v1/account/stripe/stats",
  "Account users": "https://api.backstack.com/v1/account/users",
  "Account invoices": "https://api.backstack.com/v1/account/invoices",
  "Account payment methods": "https://api.backstack.com/v1/account/payment-methods",
  "Account network": "https://api.backstack.com/v1/account/network-accounts",
  "Account version history": "https://api.backstack.com/v1/account/version-history",
  "Account module history": "https://api.backstack.com/v1/account/optional-features-history",
};

const fetchData = async (uri) => {
  fetching.value = true;
  await axios
    .get(uri, { api: "backstack" })
    .then((response) => result.value = response.data)
    .finally(() => fetching.value = false);
};


const handleClick = (k, v) => {
  selected.value = v;
  uri.value = k;
  fetchData(k);
}


</script>
