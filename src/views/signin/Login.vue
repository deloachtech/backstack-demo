<script setup>
import { LoginForm } from 'vue-assets';
import appSchema from '@/app-schema.json';
import Logo from '@/Logo.vue';
import { ref } from 'vue';
import { useSession } from '../../session-store';
import axios from 'axios';


const session = useSession()


const submitting = ref(false);
const errors = ref({})

const login = async (data) => {

    errors.value = {}

    if (!data.username) errors.value.username = 'Username required'
    if (!data.password) errors.value.password = 'Password required'

    if (Object.keys(errors.value).length === 0) {

        submitting.value = true

        axios.post('https://api.backstack.com/v1/auth/login', data)
            .then((response) => {
                //https://www.backstack.com/docs/login
                if (response.data?.select_account) {
                    session.update(response.data)
                } else {

                    // todo: select account
                    console.log(response.data)
    
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


</script>

<template>

    <LoginForm @submit="login" :allowSignup="appSchema.app.allow_signup" :loading="submitting" :errors="errors">
        <template #logo>
            <Logo class="mb-5" />
        </template>
    </LoginForm>
</template>


<style scoped></style>