import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import portfilio from '@/components/portfilio/portfilio'
import daily from '@/components/daily/daily'
import showcase from '@/components/showcase/showcase'
import about from '@/components/about/about'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/portfilio',
      name: 'portfilio',
      component: portfilio
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
