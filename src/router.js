import { createRouter, createWebHistory } from 'vue-router'
import {useSession} from "./session-store.js";
import appSchema from "./app-schema.json"
import Home from './views/Home.vue'
import Error404 from './views/error/Error404.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    { path: '/', component: Home, meta: { access: '*' } },



    // Catch all
    { path: '/:pathMatch(.*)*', component: Error404 }
  ]
})


router.beforeEach(async (to, from, next) => {

  const session = useSession()
  await session.initialize(appSchema)

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
          next('/apps')
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
