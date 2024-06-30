<script setup>
import { ResetPasswordForm, FullScreenSpinner } from 'backstack-vue-assets';
import Logo from '@/Logo.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';


const loading = ref(false)
const submitting = ref(false)
const errors = ref({})
const route = useRoute()
const success = ref(false)
const token = ref(null)


/**
 * Validate the token if it's provided in the URL. 
 * This is an optional step if you want to check the token before rendering the form.
 * @see https://backstack.com/reset-passwords#preflight-token-validation
 */
const validateToken = async () => {
    if (!route.query.token) return;
    loading.value = true
    await axios.get(`https://api.backstack.com/v1/auth/reset-password/${route.query.token}`, {
        api: 'backstack',
        // Suppress the alert message if the token is invalid so the ResetPassword component can handle it. 
        alert: false
    }).then((response) => {
        token.value = response.data.token
    }).finally(() => {
        loading.value = false
    })
};

onMounted(() => {
    validateToken();
});


/**
 * Reset the password using the form data.
 * @see https://backstack.com/reset-passwords#reset-password
 * @param data Form data
 */
const resetPassword = async (data) => {

    errors.value = {}

    // Do some basic validation. The API does more and will return an error if the data is invalid.

    if (!data.password) {
        errors.value.password = 'Password required';
    }
    if (!data.confirm) {
        errors.value.confirm = 'Password confirmation required';
    }
    if (data.password && data.confirm && data.password !== data.confirm) {
        errors.value.confirm = 'Passwords do not match';
    }

    if (Object.keys(errors.value).length === 0) {

        submitting.value = true

        await axios.post('https://api.backstack.com/v1/auth/reset-password', data, { api: 'backstack' })
            .then((response) => {

                success.value = true
                console.log(response.data)
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

    <FullScreenSpinner v-if="loading" />

    <ResetPasswordForm v-else @submit="resetPassword" :loading="submitting" :errors="errors" :token="token"
        :success="success">
        <template #logo>
            <Logo class="mb-5" />
        </template>
    </ResetPasswordForm>
</template>


<style scoped></style>