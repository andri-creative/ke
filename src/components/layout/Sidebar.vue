<script setup lang="ts">
import {
  LayersOutline,
} from '@vicons/ionicons5'
import { menuOptions } from '../../config/menu'
import { useRoute } from 'vue-router'

const collapsed = defineModel<boolean>('collapsed', { default: false })
const route = useRoute()

const isActive = (key: string) => {
  return route.name === key
}
</script>

<template>
  <aside
    :class="[
      'bg-[#ECECEC] transition-all duration-500 flex flex-col justify-between py-4 h-full border-r border-gray-200 z-20 overflow-hidden lg:rounded-none rounded-r-3xl',
      collapsed ? 'w-16' : 'w-[240px]',
    ]"
    style="transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)"
  >
    <div class="flex flex-col gap-1 w-full">
      <!-- Sidebar Brand -->
      <div class="flex items-center h-5 px-3 w-full overflow-hidden">
        <!-- <div
          class="bg-[#84934A]! p-1.5 rounded-full! shrink-0 flex items-center justify-center w-10 h-10 transition-transform duration-300"
          :class="collapsed ? 'scale-90' : 'scale-100'"
        >
          <LayersOutline class="text-white w-5 h-5" />
        </div> -->

        <span
          :class="[
            'font-bold text-gray-800 text-base whitespace-nowrap ml-3 transition-all duration-500 ease-in-out',
            collapsed
              ? 'opacity-0 -translate-x-4 pointer-events-none'
              : 'opacity-100 translate-x-0',
          ]"
        >
        Your System
        </span>
      </div>

      <!-- Menu Items -->
      <nav class="flex flex-col gap-1.5 px-3">
        <template v-for="item in menuOptions" :key="item.key">
          <router-link
            v-if="!item.disabled"
            :to="{ name: item.key }"
            :class="[
              'flex items-center transition-all duration-300 group relative rounded-full! overflow-hidden h-10 w-full',
              isActive(item.key)
                ? 'bg-[#656D3F]/10! text-[#656D3F]!'
                : 'text-gray-500 hover:bg-[#656D3F]/5! hover:text-[#656D3F]!',
            ]"
          >
            <div class="shrink-0 flex items-center justify-center w-10 h-10">
              <component :is="item.icon" class="w-[20px] h-[20px]" />
            </div>

            <span
              :class="[
                'font-medium text-[14px] whitespace-nowrap ml-3 transition-all duration-500 ease-in-out',
                collapsed
                  ? 'opacity-0 -translate-x-4 pointer-events-none'
                  : 'opacity-100 translate-x-0',
              ]"
            >
              {{ item.label }}
            </span>
          </router-link>

          <!-- Disabled Item -->
          <div
            v-else
            class="flex items-center rounded-full! opacity-30 cursor-not-allowed text-gray-400 h-10 w-full"
          >
            <div class="shrink-0 flex items-center justify-center w-10 h-10">
              <component :is="item.icon" class="w-[20px] h-[20px]" />
            </div>
            <span
              :class="[
                'font-medium text-[14px] whitespace-nowrap ml-3 transition-all duration-500 ease-in-out',
                collapsed
                  ? 'opacity-0 -translate-x-4 pointer-events-none'
                  : 'opacity-100 translate-x-0',
              ]"
            >
              {{ item.label }}
            </span>
          </div>
        </template>
      </nav>
    </div>

    <!-- Bottom Collapse Button (Hidden on Mobile/Tablet) -->
    <div class="border-t border-gray-200 pt-3 px-3 w-full hidden lg:flex">
      <button
        @click="collapsed = !collapsed"
        class="flex items-center rounded-full! hover:bg-[#656D3F]/5! transition-all duration-300 group text-left outline-none h-10 w-full"
      >
        <div class="shrink-0 flex items-center justify-center w-10 h-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-5 h-5 text-gray-400 group-hover:text-[#656D3F]! transition-all duration-300"
            :class="collapsed ? 'rotate-180' : 'rotate-0'"
          >
            <path
              fill="currentColor"
              d="M21 11H9.41l2.3-2.29a1 1 0 1 0-1.42-1.42l-4 4a1 1 0 0 0-.21.33a1 1 0 0 0 0 .76a1 1 0 0 0 .21.33l4 4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L9.41 13H21a1 1 0 0 0 0-2ZM3 3a1 1 0 0 0-1 1v16a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1Z"
            />
          </svg>
        </div>
        <span
          :class="[
            'font-medium text-[14px] text-gray-500 group-hover:text-[#656D3F]! whitespace-nowrap ml-3 transition-all duration-500 ease-in-out',
            collapsed
              ? 'opacity-0 -translate-x-4 pointer-events-none'
              : 'opacity-100 translate-x-0',
          ]"
        >
          Collapse Sidebar
        </span>
      </button>
    </div>
  </aside>
</template>
