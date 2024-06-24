<script setup>
import { ResetPasswordForm } from 'vue-assets';
import Logo from '@/Logo.vue';
import { ref } from 'vue';


const submitting = ref(false)
const errors = ref({})

const resetPassword = async (data) => {

    errors.value = {}

    if (!data.value.password) {
        errors.value.password = 'Password required';
    }
    if (!data.value.confirm) {
        errors.value.confirm = 'Password confirmation required';
    }

    if (data.value.password && data.value.confirm && data.value.password !== data.value.confirm) {
        errors.value.confirm = 'Passwords do not match';
    }

    if (Object.keys(errors.value).length === 0) {

        submitting.value = true
        
        console.log(data)
        setTimeout(() => {
            submitting.value = false
        }, 3000)
    }
}


</script>

<template>

    <ResetPasswordForm @submit="resetPassword" :loading="submitting" :errors="errors">
        <template #logo>
            <Logo class="mb-5" />
        </template>
    </ResetPasswordForm>
</template>


<style scoped></style>