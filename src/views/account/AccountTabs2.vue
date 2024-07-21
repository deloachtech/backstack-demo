<template>
  <PageHeading :heading="session.account.title">
    <template #text> Account settings. </template>
  </PageHeading>

  <ul class="nav nav-underline tabs">
    <li v-if="session.hasAccess($access.ACCOUNT_SETTINGS)" class="nav-item">
      <router-link :class="['nav-link', isActive('/account/settings')]" aria-current="page" to="/account/settings">Settings</router-link>
    </li>
    <li class="nav-item">
      <router-link :class="['nav-link', isActive('/account/users')]" aria-current="page" to="/account/users">Users</router-link>
    </li>
    <li class="nav-item">
      <router-link :class="['nav-link', isActive('/account/versioning')]" aria-current="page" to="/account/versioning">Versioning</router-link>
    </li>
    <li class="nav-item">
      <router-link :class="['nav-link', isActive('/account/integration')]" aria-current="page" to="/account/integration">Integration</router-link>
    </li>
    <li class="nav-item dropdown">
      <a :class="['nav-link', 'dropdown-toggle', isActive(['/account/payment-methods', '/account/invoices'])]" data-bs-toggle="dropdown" href="javascript:void(0)" role="button" aria-expanded="false">Billing</a>
      <ul class="dropdown-menu">
        <li><router-link :class="['dropdown-item', isActive('/account/payment-methods')]" to="/account/payment-methods">Payment Methods</router-link></li>
        <li><router-link :class="['dropdown-item', isActive('/account/invoices')]" to="/account/invoices">Invoices</router-link></li>
      </ul>
    </li>
  </ul>
  <div class="mt-5">
    <slot></slot>
  </div>
</template>

<script setup>
import { PageHeading } from "backstack-vue-assets";
import { useRoute } from "vue-router";
import { useSession } from "backstack-vue-assets/stores/session.js";

const route = useRoute();
const session = useSession();

const isActive = (paths) => {
  if (Array.isArray(paths)) {
    return paths.includes(route.path) ? "active" : "";
  }
  return route.path === paths ? "active" : "";
};
</script>

<style scoped></style>
