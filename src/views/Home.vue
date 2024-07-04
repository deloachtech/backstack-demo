<script setup>
import {
  Dropdown,
  PageHeading,
  Breadcrumbs,
  ExternalLink,
} from "backstack-vue-assets";
</script>

<template>
  <Breadcrumbs
    v-if="1 === 2"
    class="mt-3"
    :links="[
      { label: 'Home', href: 'javascript:void(0)' },
      { label: 'Library', current: true },
    ]"
  />

  <PageHeading heading="Home Page">
    <template #text>
      This is a starter page for an application using the
      <ExternalLink href="https://backstack.com" text="Backstack API" />. It's
      located at <code>src/views/Home.vue</code>.
    </template>
  </PageHeading>
</template>

<style scoped></style>
