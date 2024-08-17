<template>
  <PageHeading  heading="Application Versioning">
    <template #text> Versions provide functionality to meet the needs of your organization. </template>
    <template #actions>
      <RadioButtonGroup :options="views" v-model="view" />
    </template>
  </PageHeading>

  <Versions v-if="view === 'versions'" />
  <History v-else />
</template>

<script setup>
import Versions from "./Versions.vue";
import History from "./History.vue";
import { ref } from "vue";
import { RadioButtonGroup, PageHeading } from "@/components";

const view = ref("versions");

const views = [
  { id: "versions", label: "Versions" },
  { id: "history", label: "History" },
];
</script>

