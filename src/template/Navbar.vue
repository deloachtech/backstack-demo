<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <div class="mx-2">
        <router-link class="navbar-brand" to="/">
          <Logo style="width: 2rem" />
        </router-link>
      </div>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0 mx-3 gap-3">
          <router-link class="nav-link" aria-current="page" to="/">Home</router-link>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Example </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/table-using-component">Table using component</a></li>
              <li><a class="dropdown-item" href="/table-using-html">Table using html</a></li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li><a class="dropdown-item" href="/error404">Error 404</a></li>
              <li><a class="dropdown-item" href="/error500">Error 500</a></li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li><a class="dropdown-item" href="/login">Log in</a></li>
            </ul>
          </li>
        </ul>

        <div class="btn-group mx-2">
          <i v-if="1 === 2" class="bi bi-gear dropdown-toggle text-secondary no-arrow" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false"></i>

          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-gear"></i>
          </a>

          <ul class="dropdown-menu dropdown-menu-start dropdown-menu-md-end">
            <li><router-link class="dropdown-item" to="/user">Your settings</router-link></li>

            <li v-if="session.hasAccess([$access.ACCOUNT_SETTINGS, $access.ACCOUNT_USERS, $access.ACCOUNT_VERSIONING, $access.ACCOUNT_INTEGRATION, $access.ACCOUNT_INVOICES, $access.ACCOUNT_PAYMENT_METHODS].join())"><router-link class="dropdown-item" to="/account">Account settings</router-link></li>

            <li>
              <hr class="dropdown-divider" />
            </li>
            <li><router-link class="dropdown-item" to="/logout">Log out</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useSession } from "backstack-vue-assets/stores/session";
import Logo from "./Logo.vue";

const session = useSession();
</script>

<style scoped>
.navbar.bg-dark {
  background-color: #000000 !important;
}

.bi.bi-gear {
  font-size: 1.5em;
}

.no-arrow.dropdown-toggle::after {
  display: none;
}
</style>
