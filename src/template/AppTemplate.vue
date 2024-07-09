<template>
  <Navbar />

  <main :class="[session.loading ? 'spinner-container' : 'container']">
    <AxiosError />

    <Spinner v-if="session.loading" />

    <slot v-else></slot>
  </main>
</template>

<script setup>
import AxiosError from "../components/AxiosError.vue";
import Navbar from "./Navbar.vue";
import { useSession } from "backstack-vue-assets/stores/session";
import { Spinner } from "backstack-vue-assets";

const session = useSession();
</script>

<style scoped>
.bva-spinner {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
