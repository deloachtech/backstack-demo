<script setup>
import { useRoute } from 'vue-router'
import AppTemplate from '@/templates/AppTemplate.vue';
import SigninTemplate from './templates/SigninTemplate.vue';
import { Error404, FullScreenSpinner } from 'vue-assets';
import { useSession } from './session-store';
import { ForgotPassword, Login, ResetPassword, SelectAccount, Signup } from './views/signin';

const route = useRoute()
const session = useSession()

</script>

<template>

  <AppTemplate v-if="session.auth">
    <router-view />
  </AppTemplate>


  <SigninTemplate v-else>

    <div v-if="session.loading">
      <FullScreenSpinner />
    </div>

    <div v-else>
      <Login v-if="route.path === '/' || route.path === '/login'" />
      <ForgotPassword v-else-if="route.path === '/forgot-password'" />
      <ResetPassword v-else-if="route.path === '/reset-password'" />
      <Signup v-else-if="route.path === '/signup'" />
      <Error404 v-else buttonLabel="Login" />
    </div>
  </SigninTemplate>



</template>


<style scoped></style>