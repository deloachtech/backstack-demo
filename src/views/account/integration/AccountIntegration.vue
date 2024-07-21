<template>
  <PageHeading heading="Application Modules" as-subheading>
    <template #text> Modules provide extended application functionality. </template>
    <template #actions>
      <RadioButtonGroup :options="views" v-model="view" />
    </template>
  </PageHeading>

  <Modules v-if="view === 'modules'" />
  <History v-else />
</template>

<script setup>
import { PageHeading } from "backstack-vue-assets";
import Modules from "./Modules.vue";
import History from "./History.vue";
import { ref } from "vue";
import { RadioButtonGroup } from "@/components";

const view = ref("modules");

const views = [
  { id: "modules", label: "Modules" },
  { id: "history", label: "History" },
];
</script>

<style scoped></style>
