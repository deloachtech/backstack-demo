<template>
  <section class="py-5 px-3 mx-auto text-center bva-error-500">
    <h1 class="mb-4 display-1 fw-bold text-primary">500</h1>
    <p class="mb-4 display-4 fw-bold">{{ pageHeader }}</p>
    <p class="mb-4 fs-4 fw-light text-muted">{{ pageText }}</p>
    <a :href="buttonRoute" class="btn btn-primary my-4">{{ buttonLabel }}</a>
  </section>
</template>

<script setup>
const props = defineProps({
  buttonRoute: { type: String, default: "/" },
  pageHeader: { type: String, default: "Internal Server Error." },
  pageText: { type: String, default: "We're already working to solve the problem." },
  buttonLabel: { type: String, default: "Back to Homepage" },
});
</script>

<style scoped></style>
