<template>
  <PageHeading :heading="session.account.title">
    <template #text> Account settings. </template>
  </PageHeading>

  <Tabs
    :current-tab-id="route.params.tab"
    :tabs="
      [
        { id: 'settings', label: 'Settings', component: Settings, access: $access.ACCOUNT_SETTINGS },
        { id: 'users', label: 'Users', component: Users, access: $access.ACCOUNT_USERS },
        { id: 'versioning', label: 'Versioning', component: Versioning, access: $access.ACCOUNT_VERSIONING },
        { id: 'integration', label: 'Integration', component: Integration, access: $access.ACCOUNT_INTEGRATION },
        { id: 'invoices', label: 'Invoices', component: Invoices, access: $access.ACCOUNT_INVOICES },
        { id: 'payment-methods', label: 'Payment Methods', component: PaymentMethods, access: $access.ACCOUNT_PAYMENT_METHODS },
      ]
        .filter((item) => session.hasAccess(item.access))
        .filter((item) => item.id !== 'payment-methods' || (session.app.stripe_pub_key.length > 0 && session.app.stripe_key_exists === true))
    "
  />
</template>

<script setup>
import Settings from "./settings/AccountSettings.vue";
import Users from "./users/AccountUsers.vue";
import Invoices from "./invoices/AccountInvoices.vue";
import PaymentMethods from "./payment-methods/AccountPaymentMethods.vue";
import Versioning from "./versioning/AccountVersioning.vue";
import Integration from "./integration/AccountIntegration.vue";
import { PageHeading, Tabs } from "backstack-vue-assets";
import { useRoute } from "vue-router";
import { useSession } from "backstack-vue-assets/stores/session.js";

const route = useRoute();
const session = useSession();
</script>

<style scoped></style>
