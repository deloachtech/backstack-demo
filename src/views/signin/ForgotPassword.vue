<script setup>
import { ForgotPasswordForm } from 'vue-assets';
import Logo from '@/Logo.vue';
import { ref } from 'vue';
import  {validateEmail}  from 'vue-assets/assets/js/validateEmail.js';


const submitting = ref(false)
const errors = ref({})
const success = ref(false)

const lookupPassword = async (data) => {

    errors.value = {}

    if (!data.email) {
        errors.value.email = 'Email required';
    } else if (!validateEmail(data.email)) {
        errors.value.email = 'Invalid email address';
    }

    if (Object.keys(errors.value).length === 0) {

        submitting.value = true

        //https://www.backstack.com/docs/forgot-password

        axios.post('https://api.backstack.com/v1/auth/forgot-password', data)
            .then((response) => {
                success.value = true
            })
            .catch((error) => {
                errors.value = error.response.data.error?.fields
            })
            .finally(() => {
                submitting.value = false
            })
    }
}

</script>

<template>

    <ForgotPasswordForm @submit="lookupPassword" :loading="submitting" :errors="errors" :showSuccess="success">
        <template #logo>
            <Logo class="mb-5" />
        </template>
    </ForgotPasswordForm>
</template>


<style scoped></style>