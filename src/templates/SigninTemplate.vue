<script setup>
import AxiosError from '@/components/AxiosError.vue';
</script>

<template>
    <div class="relative-container">

        <AxiosError class="text-center" style="position: absolute; top: 1.25rem; left: 1.25rem; right: 1.25rem; margin: 0 auto; z-index: 100;" />

        <div class="d-flex align-items-center justify-content-center py-4" style="height: 100vh;">
            <div class="form-container">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

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