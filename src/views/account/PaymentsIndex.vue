<template>
  <PageHeading heading="Payments">
    <template #text>

      This application allows you to create customers and handle monetized transactions using your
      existing <ExternalLink href="https://stripe.com" text="Stripe" /> account. You can manage your banking, customers, and
      other related options there.

    </template>
    <template #actions>
      <RadioButtonGroup :options="views" v-model="view" />
    </template>
  </PageHeading>

  <PaymentSettings v-if="view === 'settings'" />
  <PaymentStats v-else />

</template>


<script setup>
import { ref } from "vue";
import PaymentSettings from "./PaymentSettings.vue";
import PaymentStats from "./PaymentStats.vue";
import { RadioButtonGroup, PageHeading, ExternalLink } from "@/components";
import { useSession } from "@/session";

const session = useSession();

const views = [
  { id: "stats", label: "Stats", access: "account-payments:*" },
  { id: "settings", label: "Settings", access: "account-stripe-settings:*" },
].filter((view) => session.hasAccess(view.access));

const view = ref(views[0].id);

</script>
