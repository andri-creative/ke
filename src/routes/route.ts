import { createRouter, createWebHistory } from 'vue-router'
import Login from '../auth/Login.vue'
import Home from '../pages/Home.vue'
import Category from '../pages/Category.vue'
import Profile from '../pages/Profile.vue'
import MainLayout from '../layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home
      },
      {
        path: 'category',
        name: 'category',
        component: Category
      },
      {
        path: 'profile',
        name: 'profile',
        component: Profile
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
