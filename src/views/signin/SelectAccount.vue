<script setup>
import { LoginForm } from 'vue-assets';
import Logo from '@/Logo.vue';
import { ref } from 'vue';


const submitting = ref(false)
const errors = ref({})

const selectAccount = async (data) => {
    
    submitting.value = true
    console.log(data)
    setTimeout(() => {
        submitting.value = false
    }, 3000)
}


</script>

<template>

    <LoginForm @submit="selectAccount" :loading="submitting" :errors="errors">
        <template #logo>
            <Logo class="mb-5" />
        </template>
    </LoginForm>
</template>


<style scoped></style>