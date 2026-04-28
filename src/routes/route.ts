import { createRouter, createWebHistory } from 'vue-router'
import Login from '../auth/Login.vue'
import Home from '../pages/Home.vue'
import Category from '../pages/category/App.vue'
import Role from '../pages/roles/App.vue'
import Expense from '../pages/expenses/App.vue'
import Customer from '../pages/customers/App.vue'
import Profile from '../pages/profile/App.vue'
import MainLayout from '../layouts/MainLayout.vue'

const isAuthenticated = () => localStorage.getItem('isLoggedIn') === 'true'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: { guestOnly: true }
  },
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
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
        path: 'role',
        name: 'role',
        component: Role
      },
      {
        path: 'expense',
        name: 'expense',
        component: Expense
      },
      {
        path: 'customer',
        name: 'customer',
        component: Customer
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

router.beforeEach((to) => {
  const needsAuth = to.matched.some((record) => record.meta.requiresAuth)
  const guestOnly = to.matched.some((record) => record.meta.guestOnly)

  if (needsAuth && !isAuthenticated()) {
    return { name: 'login' }
  }

  if (guestOnly && isAuthenticated()) {
    return { name: 'home' }
  }

  return true
})

export default router
