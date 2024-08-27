<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">

    <div class="container">

      <div class="ml-2">
        <router-link class="navbar-brand" to="/">

          <Logo style="width: 2.35rem" />
          <div v-if="1 === 2 && session.demo" class="badge rounded-pill text-bg-warning logo-badge">Demo</div>

        </router-link>
      </div>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler"
        aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarToggler">

        <!-- Application-specific navbar options -->

        <ul class="navbar-nav me-auto gap-1">

          <li class="nav-item">
            <router-link class="nav-link" to="/" @click="collapseNavbar">Home</router-link>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Examples </a>
            <ul class="dropdown-menu">

              <li><router-link class="dropdown-item" to="/example-tip" @click="collapseNavbar">Tip</router-link></li>
              <li>
                <hr class="dropdown-divider" />
              </li>

              <li><router-link class="dropdown-item" to="/example-api-results" @click="collapseNavbar">API
                  Results</router-link></li>
            </ul>
          </li>
        </ul>

        <!-- Common navbar options -->

        <div id="alerts-dropdown" class="btn-group mx-2">


          <a class="nav-link dropdown-toggle dropdown-icon" href="#" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">

            <div v-if="session.alerts.length > 0">
              <span :class="[priorityAlerts ? 'bg-danger' : 'bg-secondary', 'badge rounded-pill alert-bell-badge']">
                {{ session.alerts.length }}
                <span class="visually-hidden">alerts</span>
              </span>
              <i class="bi bi-bell alert-bell"></i>
            </div>

            <i v-else class="bi bi-bell-slash"></i>
          </a>

          <ul class="dropdown-menu dropdown-menu-start dropdown-menu-md-end">

            <li>
              <h6 class="dropdown-header">Alerts</h6>
            </li>

            <li v-if="session.alerts.length > 0">
              <hr class="dropdown-divider" />
            </li>

            <li v-for="alert in session.alerts" :key="alert.id">
              <router-link @click="collapseNavbar" :class="['dropdown-item', { 'text-danger': alert.priority === 1 }]"
                :to="alert.href">{{
                alert.title }}</router-link>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <router-link @click="collapseNavbar" class="dropdown-item" to="/app-alerts">
                View all
                <span class="badge bg-secondary ms-2 view-all-alert-badge">{{ session.alerts.length }}</span>
              </router-link>
            </li>
          </ul>
        </div>

        <div id="account-dropdown" class="btn-group mx-2">
          <a class="nav-link dropdown-toggle dropdown-icon" href="#" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            <i v-if="session.user.account_user > 1" class="bi bi-houses"></i>
            <i v-else class="bi bi-house"></i>
          </a>

          <ul class="dropdown-menu dropdown-menu-start dropdown-menu-md-end">
            <li>
              <h6 class="dropdown-header">{{ session.account.title }}</h6>
            </li>

            <li>
              <hr class="dropdown-divider" />
            </li>

            <li v-for="option in accountOptions" :key="option.title">
              <hr v-if="option.title === '_divider1' || option.title === '_divider2'" class="dropdown-divider" />
              <router-link v-else @click="collapseNavbar" class="dropdown-item" :to="option.route">{{ option.title
                }}</router-link>
            </li>

          </ul>
        </div>

        <div id="user-dropdown" class="btn-group mx-2">
          <i v-if="1 === 2" class="bi bi-gear dropdown-toggle text-secondary dropdown-icon" data-bs-toggle="dropdown"
            data-bs-display="static" aria-expanded="false"></i>

          <a class="nav-link dropdown-toggle dropdown-icon" href="#" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            <span v-html="session.user.avatar" class="user-avatar"></span>
            <!-- <i class="bi bi-person-gear"></i> -->
          </a>

          <ul class="dropdown-menu dropdown-menu-start dropdown-menu-md-end">
            <li>
              <h6 class="dropdown-header">{{ session.user.name }}</h6>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>

            <li v-for="option in userOptions" :key="option.title">
              <hr v-if="option.title === '_divider1'" class="dropdown-divider" />
              <router-link v-else @click="collapseNavbar" class="dropdown-item" :to="option.route">{{ option.title
                }}</router-link>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useSession } from "@/session";
import Logo from "./Logo.vue";

const session = useSession();

const priorityAlerts = ref(session.alerts.some(alert => alert.priority === 1));

const accountOptions = [
  { title: "Payments", route: "/account-payments", access: "account-payments:*" },
  { title: "Network", route: "/account-network", access: "account-network:*" },
  { title: "Invoices", route: "/account-invoices", access: "account-invoices:*" },
  { title: "Users", route: "/account-users", access: "account-users:*" },
  { title: "Profile", route: "/account-profile", access: "account-profile:*" },
  { title: "_divider1", access: "app-versions:*,app-modules:*" },
  { title: "App versions", route: "/app-versions", access: "app-versions:*" },
  { title: "App modules", route: "/app-modules", access: "app-modules:*" },
  { title: "_divider2", access: "account-payments:*,account-network:*,account-invoices:*,account-users:*,account-profile:*,app-versions:*,app-modules:*,app-modules:*" },
  { title: "Change account", route: "/change-account", access: "*" }
].filter(option => session.hasAccess(option.access));

const userOptions = [
  { title: "Profile", route: "/user-profile" },
  { title: "Change password", route: "/change-password" },
  { title: "Merge users", route: "/merge-users" },
  { title: "Manage notifications", route: "/manage-notifications" },
  { title: "Reset hidden tips", route: "/reset-tips" },
  { title: "_divider1", route: "" },
  { title: "Log out", route: "/logout" }
];

function collapseNavbar() {
  const navbarCollapse = document.querySelector('.navbar-collapse');
  if (navbarCollapse.classList.contains('show')) {
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
      toggle: true
    });
    bsCollapse.hide();
  }
}

</script>


<style scoped>
.logo-badge {
  position: relative;
  top: -12px;
  font-size: 0.65rem;
  padding: 0.2rem 0.3rem;
  margin-left: -12px;
}

.alert-bell {
  position: relative;
}

.alert-bell-badge {
  position: relative;
  top: -12px;
  right: -12px;
  font-size: 0.55rem;
  padding: 0.2rem 0.3rem;
  z-index: 1;
}

.view-all-alert-badge {
  float: right;
}

.user-avatar {
  width: 1.75rem;
  height: 1.75rem;
  display: inline-block;
}

.bi {
  font-size: 1.5em;
}
</style>