
<script setup>
import { ref } from "vue";
import { RadioButtonGroup, PageHeading, Error404 } from "@/components";
import { useSession } from "@/session";
import AccountNetwork from "./Networks.vue";
import NetworkInvitations from "./NetworkInvitations.vue";

const view = ref("network");
const session = useSession();

const views = [
  { id: "network", label: "Network", access: 'account-network:*' },
  { id: "invitations", label: "Invitations", access: 'account-network-invitations:*' },
].filter((item) => session.hasAccess(item.access));
</script>

<template>
  <PageHeading heading="Account Network">
    <template #text> Build networks with other accounts for collaborative opportunities. Implement revenue sharing fees to facilitate mutual growth and benefit. </template>
    <template #actions>
      <RadioButtonGroup v-model="view" :options="views" />
    </template>
  </PageHeading>

  <AccountNetwork v-if="view === 'network'" />
  <NetworkInvitations v-else-if="view === 'invitations'" />
  <Error404 v-else />
</template>


