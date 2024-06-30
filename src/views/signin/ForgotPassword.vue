<script setup>
import { ForgotPasswordForm } from 'backstack-vue-assets';
import Logo from '@/Logo.vue';
import { ref } from 'vue';
import  {validateEmail}  from 'backstack-vue-assets/assets/js/validateEmail.js';
import axios from 'axios';

const submitting = ref(false)
const errors = ref({})
const success = ref(false)


/**
 * Lookup the password using the email address.
 * @see https://backstack.com/reset-passwords#lookup-email-address
 * @param data Form data
 */
const lookupPassword = async (data) => {

    errors.value = {}

    if (!data.email) {
        errors.value.email = 'Email required';
    } else if (!validateEmail(data.email)) {
        errors.value.email = 'Invalid email address';
    }

    if (Object.keys(errors.value).length === 0) {

        submitting.value = true

        await axios.post('https://api.backstack.com/v1/auth/forgot-password', data, { api :'backstack' })
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

    <ForgotPasswordForm @submit="lookupPassword" :loading="submitting" :errors="errors" :success="success">
        <template #logo>
            <Logo class="mb-5" />
        </template>
    </ForgotPasswordForm>
</template>


<style scoped></style>