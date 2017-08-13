import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home/home'
import portfolio from '@/pages/portfolio/portfolio'
import daily from '@/pages/daily/daily'
import showcase from '@/pages/showcase/showcase'
import about from '@/pages/about/about'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: portfolio
    },
    {
      path: '/daily',
      name: 'daily',
      component: daily
    },
    {
      path: '/showcase',
      name: 'showcase',
      component: showcase
    },
    {
      path: '/about',
      name: 'about',
      component: about
    }
  ]
})
