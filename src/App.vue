<script setup>
import { useRoute } from 'vue-router'
import AppTemplate from '@/template/AppTemplate.vue';
import SigninTemplate from '@/template/SigninTemplate.vue';
import { Error404, Spinner } from 'backstack-vue-assets';
import { useSession } from 'backstack-vue-assets/stores/session';
import { ForgotPassword, Login, ResetPassword, Signup } from '@/views/signin';

const route = useRoute()
const session = useSession()

</script>

<template>

  <AppTemplate v-if="session.auth">
    <router-view />
  </AppTemplate>


  <SigninTemplate v-else>

    <div v-if="session.loading">
      <Spinner />
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