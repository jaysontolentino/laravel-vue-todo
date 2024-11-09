import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '../views/TaskList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'task-list',
      component: TaskList
    }
  ]
})

export default router
