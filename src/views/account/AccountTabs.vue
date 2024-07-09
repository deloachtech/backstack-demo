<template>
  <PageHeading :heading="session.account.title">
    <template #text> Account settings. </template>
  </PageHeading>

  <Tabs
    :current-tab-id="route.params.tab"
    :tabs="
      [
        { id: 'settings', label: 'Settings', component: Settings, access: '*' },
        { id: 'users', label: 'Users', component: Users, access: '*' },
        { id: 'versioning', label: 'Versioning', component: Versioning, access: '*' },
        { id: 'integration', label: 'Integration', component: Integration, access: '*' },
        { id: 'billing', label: 'Billing', component: Billing, access: '*' },
      ].filter((item) => session.hasAccess(item.access))
    "
  />
</template>

<script setup>
import Settings from "./AccountSettings.vue";
import Users from "./AccountUsers.vue";
import Billing from "./AccountBilling.vue";
import Versioning from "./AccountVersioning.vue";
import Integration from "./AccountIntegration.vue";
import { PageHeading, Tabs } from "backstack-vue-assets";
import { useRoute } from "vue-router";
import { useSession } from "backstack-vue-assets/stores/session.js";

const route = useRoute();
const session = useSession();
</script>

<style scoped></style>
