import { createRouter, createWebHashHistory } from 'vue-router'
import GameView from '../views/GameScreen.vue'
import TitleView from '../views/TitleScreen.vue'
import EndScreen from '../views/EndScreen.vue'

const router = createRouter({
  history: createWebHashHistory(),
  mode: 'hash',
  routes: [
    {
      path: '/game',
      name: 'game',
      component: GameView
    },
    {
      path: '/title',
      name: 'titlescreen',
      component: TitleView
    },
    {
      path: '/end',
      name: 'end',
      component: EndScreen
    }
  ]
})

export default router
