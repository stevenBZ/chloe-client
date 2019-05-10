import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/project',
      name: 'project',
      component: require('@/page/projectManage/index').default
    },
    {
      path: '/interface',
      name: 'interface',
      component: require('@/page/interface/index').default
    },
    {
      path: '/pageTemplete',
      name: 'pageTemplete',
      component: require('@/page/pageTemplate/index').default
    },
    {
      path: '/pageTemplete/list',
      name: 'pageTempleteList',
      component: require('@/page/pageTemplate/detail/list/index').default
    },
    {
      path: '/projectTemplete',
      name: 'projectTemplete',
      component: require('@/page/projectTemplate/index').default
    },
    {
      path: '*',
      redirect: '/project'
    }
  ]
})
