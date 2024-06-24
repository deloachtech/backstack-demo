<script setup>
</script>

<template>

    <div class="d-flex align-items-center justify-content-center py-4" style="height: 100vh;">
        <div class="form-container">

            <slot></slot>

        </div>
    </div>


</template>

<style scoped>
.d-flex {
    display: flex;

    /* Center vertically */
    align-items: center;

    /* Center horizontally */
    justify-content: center;

}

.form-container {
    width: 100%;
    max-width: 350px;

    /* Center horizontally */
    margin: auto;
}
</style>