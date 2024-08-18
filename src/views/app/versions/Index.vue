<template>
  <PageHeading heading="Application Versioning">
    <template #text> Versions provide functionality to meet the needs of your organization. </template>
    <template #actions>
      <RadioButtonGroup :options="views" v-model="view" />
    </template>
  </PageHeading>

  <AppVersions v-if="view === 'versions'" />
  <AccountVersionHistory v-else />
</template>

<script setup>
import AppVersions from "./AppVersions.vue";
import AccountVersionHistory from "@/views/account/version-history/AccountVersionHistory.vue";
import { ref } from "vue";
import { RadioButtonGroup, PageHeading } from "@/components";

const view = ref("versions");

const views = [
  { id: "versions", label: "Versions" },
  { id: "history", label: "History" },
];
</script>

