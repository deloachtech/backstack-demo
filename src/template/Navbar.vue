<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <div class="ml-2">
        <router-link class="navbar-brand" to="/">

          <Logo style="width: 2.35rem" />
          <div v-if="session.demo" class="badge rounded-pill text-bg-warning logo-badge">Demo</div>

        </router-link>
      </div>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarCollapse">
        <!-- Application navbar options -->

        <ul class="navbar-nav me-auto mb-2 mb-md-0 mx-3 gap-3">
          <router-link class="nav-link" aria-current="page" to="/">Home</router-link>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Quick Links </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/user-profile">User profile</a></li>
              <li><a class="dropdown-item" href="/change-password">Change user password</a></li>
              <li><a class="dropdown-item" href="/merge-users">Merge users</a></li>
              <li><a class="dropdown-item" href="/manage-notifications">Manage user notifications</a></li>
              <li><a class="dropdown-item" href="/reset-tips">Reset user hidden tips</a></li>
              <li><a class="dropdown-item" href="/logout">Log user out</a></li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li><a class="dropdown-item" href="/account-payments">Account Payments</a></li>
              <li><a class="dropdown-item" href="/account-invoices">Account Invoices</a></li>
              <li><a class="dropdown-item" href="/account-users">Account Users</a></li>
              <li><a class="dropdown-item" href="/account-profile">Account Profile</a></li>
              <li><a class="dropdown-item" href="/change-account">Change account</a></li>
              <li><a class="dropdown-item" href="/account-network">Account Network</a></li>

              <li>
                <hr class="dropdown-divider" />
              </li>

              <li><a class="dropdown-item" href="/app-versions">App versions</a></li>
              <li><a class="dropdown-item" href="/app-modules">App modules</a></li>
              <li><a class="dropdown-item" href="/app-alerts">App alerts</a></li>

             
            </ul>
          </li>
        </ul>

        <!-- Common navbar options -->

        <div id="alerts" class="btn-group mx-2">


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
              <router-link :class="['dropdown-item', {'text-danger' : alert.priority === 1}]" :to="alert.href">{{
                alert.title }}</router-link>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <router-link class="dropdown-item" to="/app-alerts">
                View all
                <span class="badge bg-secondary ms-2 view-all-alert-badge">{{ session.alerts.length }}</span>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="btn-group mx-2">
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

            <li v-if="session.hasAccess('account-payments:*')"><router-link class="dropdown-item"
                to="/account-payments">Payments</router-link></li>

            <li v-if="session.hasAccess('account-network:*')"><router-link class="dropdown-item"
                to="/account-network">Network</router-link></li>

            <li v-if="session.hasAccess('account-invoices:*')"><router-link class="dropdown-item"
                to="/account-invoices">Invoices</router-link></li>

            <li v-if="session.hasAccess('account-users:*')"><router-link class="dropdown-item"
                to="/account-users">Users</router-link></li>

            <li v-if="session.hasAccess('account-profile:*')"><router-link class="dropdown-item"
                to="/account-profile">Profile</router-link></li>

            <li v-if="session.hasAccess('app-versions:*,app-modules:*')">
              <hr class="dropdown-divider" />
            </li>

            <li v-if="session.hasAccess('app-versions:*')"><router-link class="dropdown-item" to="/app-versions">App
                versions</router-link></li>

            <li v-if="session.hasAccess('app-modules:*')"><router-link class="dropdown-item" to="/app-modules">App
                modules</router-link></li>

            <li
              v-if="session.hasAccess('account-payments:*,account-network:*,account-invoices:*,account-users:*,account-profile:*,app-versions:*,app-modules:*,app-modules:*')">
              <hr class="dropdown-divider" />
            </li>

            <li><router-link class="dropdown-item" to="/change-account">Change account</router-link></li>
          </ul>
        </div>

        <div class="btn-group mx-2">
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
            <li><router-link class="dropdown-item" to="/user-profile">Profile</router-link></li>
            <li><router-link class="dropdown-item" to="/change-password">Change password</router-link></li>
            <li><router-link class="dropdown-item" to="/merge-users">Merge users</router-link></li>
            <li><router-link class="dropdown-item" to="/merge-users">Manage notifications</router-link></li>
            <li><router-link class="dropdown-item" to="/reset-tips">Reset hidden tips</router-link></li>
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
import { ref } from "vue";
import { useSession } from "@/session";
import Logo from "./Logo.vue";

const session = useSession();

const priorityAlerts = ref(session.alerts.some(alert => alert.priority === 1));
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

.navbar.bg-dark {
  background-color: #000000 !important;
}

.bi {
  font-size: 1.5em;
}

.user-avatar {
  width: 1.75rem;
  height: 1.75rem;
  display: inline-block;
}

.view-all-alert-badge {
  float: right;
}
</style>
