<script setup>
import { SignupForm } from 'vue-assets';
import Logo from '@/Logo.vue';
import { ref } from 'vue';
import { validateEmail } from 'vue-assets/assets/js/validateEmail.js';
import countries from 'vue-assets/assets/data/countries.json'
import appSchema from '@/app-schema.json'

const submitting = ref(false)
const errors = ref({})

const validate = (data) => {

    errors.value = {}

    if (!data.email) {
        errors.value.email = 'Email required';
    } else if (!validateEmail(data.email)) {
        errors.value.email = 'Invalid email address';
    }

    if (!data.name) errors.value.name = 'Name required'
    if (!data.username) errors.value.username = 'Username required'
    if (!data.password) errors.value.password = 'Password required'
    if (!data.account_title) errors.value.account_title = 'Company name required'
    if (!data.domain_id) errors.value.domain_id = 'Access type required'
    if (!data.country_id) errors.value.country_id = 'Country required'

    if (data.username && data.password) {
        if (data.username === data.password) {
            errors.value.password = 'Password cannot be username'
        } else {
            if (data.password.length < 8) {
                errors.value.password = 'Password must be at least 8 characters'
            }
            if (data.username.length < 8) {
                errors.value.username = 'Username must be at least 8 characters'
            }
        }
    }
}

const signup = async (data) => {

    errors.value = {}

    validate(data)

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

    <SignupForm @submit="(data) => signup(data)" :loading="submitting" :errors="errors" :countries="countries"
        :domains="appSchema.domains">
        <template #logo>
            <Logo class="mb-5" />
        </template>
    </SignupForm>
</template>


<style scoped></style>