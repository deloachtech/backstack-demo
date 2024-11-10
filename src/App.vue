<script setup>
import { useRoute } from "vue-router";
import AppTemplate from "@/template/AppTemplate.vue";
import SigninTemplate from "@/template/SigninTemplate.vue";
import { useSession } from "@/session";
import Signup from "@/views/app/Signup.vue";
import ForgotPassword from "@/views/app/ForgotPassword.vue";
import ResetPassword from "@/views/app/ResetPassword.vue";
import Login from "@/views/app/Login.vue";
import { Spinner, Error404 } from "@/components";

const route = useRoute();
const session = useSession();
</script>

<template>
  <AppTemplate v-if="session.auth === true">

    <!-- Spinner here keeps the template elements visible -->
    <Spinner v-if="session.loading" />
    
    <router-view v-else />
  </AppTemplate>

  <SigninTemplate v-else>
    <Spinner v-if="session.loading" />
    <Login v-else-if="route.path === '/' || route.path === '/login'" />
    <ForgotPassword v-else-if="route.path === '/forgot-password'" />
    <ResetPassword v-else-if="route.path === '/reset-password'" />
    <Signup v-else-if="route.path === '/signup'" />
    <Error404 v-else buttonLabel="Login" />
  </SigninTemplate>
</template>
