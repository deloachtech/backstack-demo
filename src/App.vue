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

<script setup>
import { useRoute } from "vue-router";
import AppTemplate from "@/template/AppTemplate.vue";
import SigninTemplate from "@/template/SigninTemplate.vue";
import { useSession } from "@/session";
import { ForgotPassword, Login, ResetPassword, Signup } from "@/views/signin";
import { Spinner, Error404 } from "@/components";

const route = useRoute();
const session = useSession();
</script>
