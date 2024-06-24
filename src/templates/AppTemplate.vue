<script setup>
import Toast from '../components/Toast.vue';

</script>

<template>

<Toast/>


  <main class="container">
   <slot></slot>
  </main>
</template>


<style scoped>
body {
  /* min-height: 75rem; */
  padding-top: 4.5rem;
}

</style>