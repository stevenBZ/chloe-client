import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/project',
      name: 'project',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/interface',
      name: 'interface',
      component: require('@/page/interface/index').default
    },
    {
      path: '/templet',
      name: 'templet',
      component: require('@/page/templet/index').default
    },
    {
      path: '*',
      redirect: '/project'
    }
  ]
})
