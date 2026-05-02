<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../config/api'

type UserResponse = {
  message?: string
  user?: unknown
  data?: unknown
}

const user = ref<unknown>(null)
const isLoading = ref(false)
const errorMessage = ref('')
const router = useRouter()
const TOKEN_KEY = 'accessToken'

const getUser = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      throw new Error('Token login tidak ditemukan. Silakan login ulang.')
    }

    const clientTime = new Date().toISOString()
    const response = await fetch(api.user, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'x-client-time': clientTime,
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem(TOKEN_KEY)
        router.push('/')
      }
      throw new Error(`Gagal ambil data user (${response.status})`)
    }

    const data: UserResponse = await response.json()
    user.value = data.user ?? data.data ?? null
  } catch (error) {
    errorMessage.value =
      error instanceof Error
        ? error.message
        : 'Terjadi kesalahan saat mengambil data user.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  void getUser()
})
</script>

<template>
  <div class="pb-2">
    <h1 class="text-2xl font-bold text-accent">Home Page</h1>
    <p class="text-accent/70 mt-1">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
    </p>
    <p v-if="isLoading" class="mt-2 text-sm text-accent/60">
      Memuat data user...
    </p>
    <p v-else-if="errorMessage" class="mt-2 text-sm text-red-500">
      {{ errorMessage }}
    </p>
    <div class="mt-2 grid grid-cols-2"></div>
  </div>
</template>
