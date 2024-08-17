<template>
  <Navbar />

  <main :class="[session.loading ? '_spinner-container' : 'container mb-5']">

    <AxiosError v-if="!session.loading" />

    <Spinner v-if="session.loading" />

    <div v-else>

      <slot v-if="!session.loading"></slot>

    </div>
  </main>
</template>

<script setup>
import Navbar from "./Navbar.vue";
import { useSession } from "@/session";
import { AxiosError, Spinner } from "@/components";

const session = useSession();


</script>

<style scoped>
._spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25vh;
  /* 1/4 of the screen height */
}
</style>
