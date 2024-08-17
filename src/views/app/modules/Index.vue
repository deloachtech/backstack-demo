<template>
  <PageHeading  heading="Application Modules">
    <template #text> Modules provide extended application functionality. </template>
    <template #actions>
      <RadioButtonGroup :options="views" v-model="view" />
    </template>
  </PageHeading>

  <Modules v-if="view === 'modules'" />
  <History v-else />
</template>

<script setup>
import Modules from "./Modules.vue";
import History from "./History.vue";
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
