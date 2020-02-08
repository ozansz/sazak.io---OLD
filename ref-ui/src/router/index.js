import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/components/HomePage'
import LinkPage from '@/components/LinkPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/:code',
      name: 'LinkPage',
      component: LinkPage
    }
  ]
})
