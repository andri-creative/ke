<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  PersonCircleOutline as UserIcon,
} from '@vicons/ionicons5'
import { authService, type LoggedInUser } from '../../services/authService'

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const router = useRouter()

const user = ref<LoggedInUser | null>(authService.getCachedUser())

const getLoggedInUser = async () => {
  try {
    const fetchedUser = await authService.fetchUser()
    if (fetchedUser) {
      user.value = fetchedUser
    }
  } catch (error: any) {
    console.error('Get profile error:', error)
    if (error.message === 'Unauthorized') {
      router.push('/')
    }
  }
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

const handleLogout = async () => {
  await authService.logout()
  isOpen.value = false
  router.push('/')
}

onMounted(() => {
  window.addEventListener('click', closeDropdown)
  void getLoggedInUser()
})

onUnmounted(() => {
  window.removeEventListener('click', closeDropdown)
})
</script>

<template>
  <div class="flex items-center gap-2 relative" ref="dropdownRef">
    <div class="text-right hidden md:block leading-tight select-none">
      <p class="text-[11px] font-bold text-[#492828]">
        {{ user?.name ?? '-' }}
      </p>
      <p class="text-[9px] text-[#492828]/50 font-medium">
        {{ user?.role ?? 'User' }}
      </p>
    </div>

    <!-- Avatar Button -->
    <button
      @click="toggleDropdown"
      class="flex items-center focus:outline-none p-0! h-9 w-9 relative group"
    >
      <!-- Gradient Border Wrapper -->
      <div
        class="w-9 h-9 rounded-full! bg-linear-to-tr from-[#84934A] to-[#656D3F] p-px shadow-sm transition-transform duration-300 group-hover:scale-105"
      >
        <div
          class="bg-white w-full h-full rounded-full! p-px flex items-center justify-center overflow-hidden"
        >
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Andri"
            alt="Avatar"
            class="w-full h-full object-cover rounded-full!"
          />
        </div>
      </div>
      <span
        class="absolute top-0 right-0 block h-3 w-3 rounded-full! bg-[#84934A] border-2 border-white shadow-sm"
      ></span>
    </button>

    <!-- Dropdown Menu (Smooth Transition) -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0 -translate-y-2"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-95 opacity-0 -translate-y-2"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 top-11 w-48 bg-white rounded-xl shadow-xl border border-[#ECECEC] z-50 py-1.5 transform origin-top-right overflow-hidden"
      >
        <div class="px-3 py-2 border-b border-[#ECECEC] mb-1 bg-[#ECECEC]/20">
          <p class="text-[12px] font-bold text-[#492828]">
            {{ user?.name ?? '-' }}
          </p>
          <p class="text-[10px] text-[#492828]/50 truncate">
            {{ user?.email ?? '-' }}
          </p>
        </div>

        <div class="px-1.5 space-y-0.5">
          <a
            href="#"
            class="flex items-center gap-2.5 px-2 py-1.5 text-[13px] text-[#492828]/80 rounded-lg hover:bg-[#656D3F]/10 hover:text-[#656D3F] transition-all group/item"
          >
            <div
              class="w-7 h-7 rounded-md bg-[#656D3F]/5 flex items-center justify-center group-hover/item:bg-white transition-colors"
            >
              <UserIcon class="w-4 h-4 text-[#656D3F]" />
            </div>
            <span class="font-medium">Profile</span>
          </a>

          <a
            href="#"
            class="flex items-center gap-2.5 px-2 py-1.5 text-[13px] text-[#492828]/80 rounded-lg hover:bg-[#656D3F]/10 hover:text-[#656D3F] transition-all group/item"
          >
            <div
              class="w-7 h-7 rounded-md bg-[#656D3F]/5 flex items-center justify-center group-hover/item:bg-white transition-colors"
            >
              <EditIcon class="w-4 h-4 text-[#656D3F]" />
            </div>
            <span class="font-medium">Settings</span>
          </a>
        </div>

        <div class="my-1.5 border-t border-[#ECECEC] mx-2"></div>

        <div class="px-1.5">
          <button
            type="button"
            @click="handleLogout"
            class="flex items-center gap-2.5 px-2 py-1.5 text-[13px] text-red-500 rounded-lg hover:bg-red-50 transition-all group/item"
          >
            <div
              class="w-7 h-7 rounded-md bg-red-50 flex items-center justify-center group-hover/item:bg-white transition-colors"
            >
              <LogoutIcon class="w-4 h-4" />
            </div>
            <span class="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
