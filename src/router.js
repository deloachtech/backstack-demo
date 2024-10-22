import { createRouter, createWebHistory } from 'vue-router'
import { useSession } from "./session.js";
import Home from './views/Home.vue'
import Error404 from './views/error/Error404.vue'

//import assignAccess from '../src/assign-access.json';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    { path: '/', component: Home, meta: { access: '*' } },

    // Examples
    { path: '/example-tip', meta: { access: '*' }, component: () => import('@/views/examples/ExampleTip.vue') },
    { path: '/example-api-results', meta: { access: '*' }, component: () => import('@/views/examples/ApiResults.vue') },


    // User

    { path: '/user', meta: { access: '*' }, component: () => import('@/views/user/User.vue') },
    { path: '/user/change-account', meta: { access: '*' }, component: () => import('@/views/user/ChangeAccount.vue') },
    { path: '/user/change-password', meta: { access: '*' }, component: () => import('@/views/user/ChangePassword.vue') },
    { path: '/user/hidden-tips', meta: { access: '*' }, component: () => import('@/views/user/HiddenTips.vue') },
    { path: '/user/merge', meta: { access: '*' }, component: () => import('@/views/user/Merge.vue') },
    { path: '/user/notification-settings', meta: { access: '*' }, component: () => import('@/views/user/NotificationSettings.vue') },


    // Account

    { path: '/account', meta: { access: 'account:*,account-urls:*' }, component: () => import('@/views/account/Account.vue') },
    { path: '/account/invoices', meta: { access: 'account-invoices:*' }, component: () => import('@/views/account/InvoicesIndex.vue') },
    { path: '/account/networks', meta: { access: 'account-networks:*' }, component: () => import('@/views/account/NetworksIndex.vue') },
    { path: '/account/optional-features', meta: { access: 'account-optional-features:*' }, component: () => import('@/views/account/OptionalFeatures.vue') },
    // The 'name' value is used in the component
    { path: '/account/payment-methods', name: 'accountPaymentMethods', meta: { access: 'account-payment-methods:*' }, component: () => import('@/views/account/PaymentMethods.vue') },
    { path: '/account/users', meta: { access: 'account-users:*' }, component: () => import('@/views/account/Users.vue') },
    { path: '/account/versions', meta: { access: 'account-versions:*' }, component: () => import('@/views/account/Versions.vue') },

    // { path: '/account-payments', meta: { access: 'account-payments:*,account-stripe-settings' }, component: () => import('@/views/account/payments/Index.vue') },


    // App

    { path: '/app/alerts', meta: { access: '*' }, component: () => import('@/views/app/Alerts.vue') },
    { path: '/app/contact', meta: { access: '*' }, component: () => import('@/views/app/Contact.vue') },
    { path: '/app/forgot-password', meta: { access: '*' }, component: () => import('@/views/app/ForgotPassword.vue') },
    { path: '/app/login', meta: { access: '*' }, component: () => import('@/views/app/Login.vue') },
    { path: '/app/logout', meta: { access: '*' }, component: () => import('@/views/app/Logout.vue') },
    { path: '/app/optional-features', meta: { access: 'app-optional-features:*' }, component: () => import('@/views/app/OptionalFeaturesIndex.vue') },
    { path: '/app/reset-password', meta: { access: '*' }, component: () => import('@/views/app/ResetPassword.vue') },
    { path: '/app/signup', meta: { access: '*' }, component: () => import('@/views/app/Signup.vue') },
    { path: '/app/versions', meta: { access: 'app-versions:*' }, component: () => import('@/views/app/Versions.vue') },


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
