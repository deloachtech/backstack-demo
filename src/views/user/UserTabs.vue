<template>
  <PageHeading :heading="session.user.name">
    <template #text> Your settings. </template>
  </PageHeading>

  <Tabs
    :current-tab-id="route.params.tab"
    :tabs="[
      { id: 'settings', label: 'Settings', component: Settings, access: '*' },
      { id: 'merge', label: 'Merge', component: Merge, access: '*' },
    ]"
  />
</template>

<script setup>
import Settings from "./UserSettings.vue";
import Merge from "./UserMerge.vue";
import { PageHeading, Tabs } from "backstack-vue-assets";
import { useRoute } from "vue-router";
import { useSession } from "backstack-vue-assets/stores/session.js";

const route = useRoute();
const session = useSession();
</script>

<style scoped></style>
