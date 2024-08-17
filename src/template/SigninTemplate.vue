<template>
  <AxiosError class="text-center" style="position: absolute; top: 1.25rem; left: 1.25rem; right: 1.25rem; margin: 0 auto; z-index: 100" />

  <div class="relative-container">
    <div class="d-flex align-items-center justify-content-center signup-container">
      <div class="form-container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AxiosError } from "@/components";
</script>

<style scoped>
.relative-container {
  position: relative;
}

.d-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-container {
  width: 100%;
  max-width: 350px;
}
</style>
