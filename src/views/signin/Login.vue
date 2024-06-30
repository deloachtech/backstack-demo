<script setup>
import { LoginForm, SelectAccountForm } from 'backstack-vue-assets';
import appSchema from '@/app-schema.json';
import Logo from '@/Logo.vue';
import { ref } from 'vue';
import { useSession } from '../../session-store';
import axios from 'axios';


const session = useSession()
const submitting = ref(false);
const errors = ref({})
const select = ref({})


/**
 * Login using the form data.
 * @see https://backstack.com/login
 * @param data Form data
 */
const login = async (data) => {

    errors.value = {}

    if (!data.username) errors.value.username = 'Username required'
    if (!data.password) errors.value.password = 'Password required'

    if (Object.keys(errors.value).length === 0) {

        submitting.value = true

        await axios.post('https://api.backstack.com/v1/auth/login', data, { api: 'backstack' })
            .then((response) => {

                if (response.data?.select_account) {
                    
                    // https://backstack.com/login.html#selecting-accounts
                    select.value = response.data.select_account
                    
                } else {
                    session.update(response.data)
                }
            })
            .catch((error) => {
                errors.value = error.response.data.error?.fields
            })
            .finally(() => {
                submitting.value = false
            })
    }
}


/**
 * Select an account using the form data.
 * @see https://backstack.com/login.html#selecting-accounts
 * @param data Form data
 */
const selectAccount = async (data) => {
    submitting.value = true
    await axios.post('https://api.backstack.com/v1/auth/login-account', data, { api: 'backstack' })
        .then((response) => {
            session.update(response.data)
        })
        .finally(() => {
            submitting.value = false
        })
}

</script>

<template>

    <SelectAccountForm v-if="select?.accounts" :values="select" @submit="selectAccount" :loading="submitting"
        :errors="errors">
        <template #logo>
            <Logo class="mb-5" />
        </template>
    </SelectAccountForm>

    <LoginForm v-else @submit="login" :allowSignup="appSchema.app.allow_signup" :loading="submitting" :errors="errors">
        <template #logo>
            <Logo class="mb-5" />
        </template>
    </LoginForm>
</template>


<style scoped></style>