import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'
import AdminPanel from './views/AdminPanel.vue'
import Design from './views/Design.vue'
import Illustrations from './views/Illustrations.vue'
import Other from './views/Other.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/manage',
      name: 'manage',
      component: AdminPanel
    },
    {
      path: '/illustrations',
      name: 'illustrations',
      component: Illustrations
    },
    {
      path: '/design',
      name: 'design',
      component: Design
    },
    {
      path: '/other',
      name: 'other',
      component: Other
    }
  ]
})
