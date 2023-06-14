import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JobsView from '../views/JobsView.vue'
import LoginView from '../views/LoginView.vue'
import InternshipsView from '../views/InternshipsView.vue'
import SettingsView from '../views/SettingsView.vue'
import NewOfferFormView from '../views/NewOfferFormView.vue'
import GraduatesView from '../views/GraduatesView.vue'
import AddUsersView from '../views/AddUsersView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: JobsView
    },    
    {
      path: '/internships',
      name: 'internships',
      component: InternshipsView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/newoffer',
      name: 'newoffer',
      component: NewOfferFormView
    },
    {
      path: '/graduates',
      name: 'graduates',
      component: GraduatesView
    },
    {
      path: '/addusers',
      name: 'addusers',
      component: AddUsersView
    },


    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: {
        render: {'fdvdfv':'404 - Page Not Found'}
      }
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
