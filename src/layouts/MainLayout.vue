<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Header from '../components/layout/Header.vue'
import Sidebar from '../components/layout/Sidebar.vue'
import Breadcrumb from '../components/layout/Breadcrumb.vue'

const collapsed = ref(false)
const mobileMenuOpen = ref(false)
const windowWidth = ref(
  typeof window !== 'undefined' ? window.innerWidth : 1280,
)

const updateWidth = () => {
  windowWidth.value = window.innerWidth
  // If screen becomes large (Desktop > 1024px), close the mobile drawer
  if (windowWidth.value >= 1024) {
    mobileMenuOpen.value = false
  }
}

const toggleSidebar = () => {
  // If screen is smaller than 1024px (iPad/Mobile), toggle the drawer
  if (windowWidth.value < 1024) {
    mobileMenuOpen.value = !mobileMenuOpen.value
  } else {
    // If desktop, toggle collapse
    collapsed.value = !collapsed.value
  }
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})
</script>

<template>
  <div
    class="fixed inset-0 flex flex-col bg-[#ECECEC] font-inter text-[#492828] overflow-hidden"
  >
    <!-- Top Header -->
    <Header @toggle-sidebar="toggleSidebar" />

    <div class="flex flex-1 overflow-hidden pt-14 relative">
      <!-- Mobile/Tablet Backdrop -->
      <Transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="mobileMenuOpen"
          @click="mobileMenuOpen = false"
          class="fixed inset-0 bg-black/50 z-40 lg:hidden"
        ></div>
      </Transition>

      <!-- Sidebar (Drawer on mobile/tablet, Static on desktop) -->
      <Transition
        enter-active-class="transition-transform duration-500 ease-out"
        enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-500 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full"
      >
        <div
          v-if="mobileMenuOpen || windowWidth >= 1024"
          :class="[
            'fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0 h-full',
            windowWidth >= 1024 ? 'translate-x-0' : '',
          ]"
        >
          <Sidebar v-model:collapsed="collapsed" />
        </div>
      </Transition>

      <!-- Main Content Area -->
      <main class="flex-1 flex flex-col min-w-0 pb-4 overflow-hidden">
        <div
          class="flex-1 flex flex-col mx-2 lg:mx-4 rounded-3xl! shadow-lg! overflow-hidden bg-white border border-gray-100"
        >
          <!-- Panel Header (Breadcrumb) -->
          <Breadcrumb />

          <!-- Pane Content -->
          <div class="flex-1 p-3 lg:p-4 overflow-y-auto custom-scrollbar">
            <router-view />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.font-inter {
  font-family: 'Inter', sans-serif;
}
</style>
