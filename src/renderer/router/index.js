import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: require('@/components/HomePage').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/tools',
      name: 'tools-page',
      component: require('@/components/ToolsPage').default
    },
    {
      path: '/games',
      name: 'games-page',
      component: require('@/components/GamesPage').default
    },
    {
      path: '/game-items',
      name: 'game-items',
      component: require('@/components/Games/GameItemsPage').default,
      children: [
        {
          path: 'demo',
          component: require('@/components/Games/Demo').default
        }
      ]
    },
    {
      path: '/tool-items',
      name: 'tool-items',
      component: require('@/components/ToolItems/ToolItemsPage').default,
      children: [
        {
          path: 'time-trans',
          component: require('@/components/ToolItems/TimeTransPage').default
        },
        {
          path: 'pass-manage',
          component: require('@/components/ToolItems/PassManagePage').default
        }
      ]
    }
  ]
})
