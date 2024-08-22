import { createRouter, createWebHistory } from 'vue-router'
import { useSession } from "./session.js";
import Home from './views/Home.vue'
import Error404 from './views/error/Error404.vue'

//import assignAccess from '../src/assign-access.json';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    { path: '/', name: 'home', component: Home, meta: { access: '*' } },

    // Examples
    { path: '/example-tip', meta: { access: '*' }, component: () => import('@/views/examples/ExampleTip.vue') },
    { path: '/example-api-results', meta: { access: '*' }, component: () => import('@/views/examples/ApiResults.vue') },

    // User
    { path: '/user-profile', meta: { access: '*' }, component: () => import('@/views/user/UserProfile.vue') },
    { path: '/reset-tips', meta: { access: '*' }, component: () => import('@/views/user/ResetTips.vue') },
    { path: '/change-password', meta: { access: '*' }, component: () => import('@/views/user/ChangePassword.vue') },
    { path: '/merge-users', meta: { access: '*' }, component: () => import('@/views/user/MergeUsers.vue') },
    { path: '/manage-notifications', meta: { access: '*' }, component: () => import('@/views/user/ManageNotifications.vue') },

    // Account
    { path: '/account-payments', meta: { access: 'account-payments:*,account-stripe-settings' }, component: () => import('@/views/account/payments/Index.vue') },
    { path: '/account-network', meta: { access: 'account-network:*' }, component: () => import('@/views/account/network/Index.vue') },
    { path: '/account-profile', meta: { access: 'account-profile:*,account-urls:*' }, component: () => import('@/views/account/profile/AccountProfile.vue') },
    { path: '/account-invoices', meta: { access: 'account-invoices:*' }, component: () => import('@/views/account/invoices/Index.vue') },
    // The name value is used in the component
    { path: '/account-payment-methods', name: 'accountPaymentMethods', meta: { access: 'account-payment-methods:*' }, component: () => import('@/views/account/payment-methods/PaymentMethods.vue') },
    { path: '/account-users', meta: { access: 'account-users:*' }, component: () => import('@/views/account/users/AccountUsers.vue') },
    { path: '/change-account', meta: { access: '*' }, component: () => import('@/views/account/change/ChangeAccount.vue') },

    // App
    { path: '/app-versions', meta: { access: 'app-versions:*' }, component: () => import('@/views/app/versions/Index.vue') },
    { path: '/app-modules', meta: { access: 'app-modules:*' }, component: () => import('@/views/app/modules/Index.vue') },
    { path: '/app-alerts', meta: { access: '*' }, component: () => import('@/views/app/alerts/AppAlerts.vue') },
    { path: '/logout', meta: { access: '*' }, component: () => import('@/views/app/logout/Logout.vue') },

    // Catch all
    { path: '/:pathMatch(.*)*', component: Error404 }
  ]
})


router.beforeEach(async (to, from, next) => {

  const session = useSession()

  var _assignAccess = {};
  // if (process.env.NODE_ENV === 'development') {
  //   _assignAccess = assignAccess;
  // }

  // an await here causes the previous page to briefly flash before the next page loads.
  session.initialize(_assignAccess);

  // if (to.path === '/logout') {
  //   await session.logout()
  //     .then(() => {
  //       next('/login')
  //     })
  // } else {
    if (session.auth === true) {
      if (session.hasAccess(to.meta.access)) {
        next()
      } else {
        next('/')
      }
    } else {
      next()
    }
  // }
});


export default router
