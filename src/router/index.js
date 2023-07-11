import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JobsView from '../views/JobsView.vue'
import LoginView from '../views/LoginView.vue'
import InternshipsView from '../views/InternshipsView.vue'
import NewOfferFormView from '../views/NewOfferFormView.vue'
import GraduatesView from '../views/GraduatesView.vue'
import UsersView from '../views/UsersView.vue'
import OfferView from '../views/OfferView.vue'
import AddUsersView from '../views/AddUsersView.vue'
import PageNotFoundView from '../views/PageNotFoundView.vue'
import OffersView from '../views/OffersView.vue'
import StatView from '../views/StatView.vue'
import UserView from '../views/UserView.vue'
import UnverifiedOfferView from '../views/UnverifiedOfferView.vue'
import InfoView from '../views/InfoView.vue'



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
      path: '/users',
      name: 'users',
      component: UsersView
    },
    {
      path: '/user/:id',
      name: 'user',
      component: UserView
    },
    {
      path: '/offer/:id',
      name: 'offer',
      component: OfferView,
    },
    {
      path: '/offer/unverified/:id',
      name: 'unverifiedoffer',
      component: UnverifiedOfferView,
    },
    {
      path: '/stat',
      name: 'stat',
      component: StatView,
    },
    {
      path: '/offers',
      name: 'offers',
      component: OffersView,
    },
    {
      path: '/info',
      name: 'info',
      component: InfoView,
    },
    { 
      path: '/:pathMatch(.*)*', 
      component: PageNotFoundView,
    }
  ]
})

export default router
