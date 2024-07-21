import { createRouter, createWebHistory } from 'vue-router'
import { useSession } from "backstack-vue-assets/stores/session.js";
import Home from './views/Home.vue'
import Error404 from './views/error/Error404.vue'

// We'cant use $access here, because it's not initialized yet.
import accessConstants from './configs/access-constants.json'

import hasAccess from './assets/js/hasAccess';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    { path: '/', component: Home, meta: { access: accessConstants.ALL } },



    // Common
    { path: '/account/:tab?', meta: { access: [accessConstants.ACCOUNT_SETTINGS, accessConstants.ACCOUNT_PAYMENT_METHODS, accessConstants.ACCOUNT_VERSIONING, accessConstants.ACCOUNT_INTEGRATION].join() }, component: () => import('@/views/account/AccountTabs.vue') },
    { path: '/user/:tab?', meta: { access: accessConstants.ALL }, component: () => import('@/views/user/UserTabs.vue') },


    // Catch all
    { path: '/:pathMatch(.*)*', component: Error404 }
  ]
})


router.beforeEach(async (to, from, next) => {

  const session = useSession()

  /**
   * Initialize the session store with the hasAccessFunction (imported above).
   * @param {function} hasAccessFunction - Optional access control function. If empty, the default
   * hasAccess function from the backstack-vue-assets npm module will be used.
   */
  await session.initialize(hasAccess)

  if (to.path === '/logout') {
    await session.logout()
      .then(() => {
        next('/login')
      })
  }

  if (session.auth === true) {
    if (session.hasAccess(to.meta.access)) {
      next()
    } else {
      next('/')
    }
  } else {
    //console.log('router', to.path)
    next()
  }
  // console.log('path', to.path);
  // console.log('session.user', session.access)

  // next()
});


export default router
