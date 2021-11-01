import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import SignedInContent from '../views/SignedInContent.vue'
import Feed from '../components/Feed.vue'
import SearchResults from '../components/SearchResults.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/account',
    component: SignedInContent,
    children: [
      {
        path: '/feed',
        component: Feed
      },
      {
        path: '/search',
        component: SearchResults
      }
    ]
  }

  // {
    // path: '/about',
    // name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
