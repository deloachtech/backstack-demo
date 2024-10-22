<template>
  <PageHeading  heading="Invoices">
    <template #text> Your account invoices. </template>
    <template #actions>
      <RadioButtonGroup :options="views" v-model="view" />
    </template>
  </PageHeading>

  <AccountInvoices v-if="view === 'invoices'" />
  <PaymentMethods v-else />
</template>

<script setup>
import AccountInvoices from "./AccountInvoices.vue";
import PaymentMethods from "@/views/account/payment-methods/PaymentMethods.vue";
import { ref } from "vue";
import { RadioButtonGroup, PageHeading } from "@/components";
import { useSession } from "@/session";

const view = ref("invoices");
const session = useSession();

const views = [
  { id: "invoices", label: "Invoices", access: 'account-invoices:*' },
  { id: "payment-methods", label: "Payment Methods", access: 'account-payment-methods:*' },
]
  .filter((item) => session.hasAccess(item.access))
  .filter((item) => item.id !== "payment-methods" || (session.app.stripe_pub_key.length > 0 && session.app.stripe_key_exists === true));
</script>


