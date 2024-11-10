<script setup>
import Versions from "./Versions.vue";
import AccountVersionHistory from "@/views/account/Versions.vue";
import { ref } from "vue";
import { RadioButtonGroup, PageHeading } from "@/components";

const view = ref("versions");

const views = [
  { id: "versions", label: "Versions" },
  { id: "history", label: "History" },
];
</script>

<template>
  <PageHeading heading="Application Versioning">
    <template #text> Versions provide functionality to meet the needs of your organization. </template>
    <template #actions>
      <RadioButtonGroup :options="views" v-model="view" />
    </template>
  </PageHeading>

  <Versions v-if="view === 'versions'" />
  <AccountVersionHistory v-else />
</template>

