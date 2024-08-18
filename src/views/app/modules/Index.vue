<template>
  <PageHeading  heading="Application Modules">
    <template #text> Modules provide extended application functionality. </template>
    <template #actions>
      <RadioButtonGroup :options="views" v-model="view" />
    </template>
  </PageHeading>

  <AppModules v-if="view === 'modules'" />
  <AccountModuleHistory v-else />
</template>

<script setup>
import AppModules from "./AppModules.vue";
import AccountModuleHistory from "@/views/account/module-history/AccountModuleHistory.vue";
import { ref } from "vue";
import { RadioButtonGroup, PageHeading } from "@/components";
import { useSession } from "@/session";

const session = useSession();
const view = ref("modules");

const views = [
  { id: "modules", label: "Modules", access: "app-modules:*" },
  { id: "history", label: "History", access: "app-modules:*" },
].filter((item) => session.hasAccess(item.access));
</script>
