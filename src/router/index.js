import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { authGuard } from '../auth/authGuard';

Vue.use(VueRouter)

//Routes

const routes = [
  {
    //Route to First-page
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    //Route to About-page
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    //Route to Myplats-pagen, and here it checks the if the user is logged in. If not the user will be forwarded to login-page
    path: '/myplants',
    name: 'Myplants',
    component: () => import('../views/Myplants.vue'),
    beforeEnter: authGuard,
  }

]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
