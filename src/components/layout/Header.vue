<script setup lang="ts">
import { NLayoutHeader, NInput, NIcon } from "naive-ui";
import { SearchOutline, FlashOutline } from "@vicons/ionicons5";
import UserProfile from "./UserProfile.vue";
</script>

<template>
  <n-layout-header
    class="h-14 flex items-center px-6 justify-between bg-[#ECECEC]! z-20"
  >
    <!-- Logo Section -->
    <div class="flex items-center gap-2">
      <div
        class="bg-blue-600! p-1.5 rounded-lg! flex items-center justify-center"
      >
        <n-icon class="text-white w-5 h-5" :component="FlashOutline" />
      </div>
      <span
        class="font-bold text-xl text-gray-800 tracking-tight hidden sm:block"
        >Andri Dev</span
      >
    </div>

    <!-- Search Bar Area -->
    <div class="flex-1 max-w-md mx-8">
      <div class="relative flex items-center group">
        <n-input
          round
          placeholder="Cari sesuatu..."
          class="w-full bg-gray-100! border-none! text-sm transition-all outline-none custom-search"
        >
          <template #prefix>
            <n-icon class="text-gray-400"><SearchOutline /></n-icon>
          </template>
        </n-input>
      </div>
    </div>

    <!-- User Profile Area -->
    <UserProfile />
  </n-layout-header>
</template>

<style scoped>
/* Search bar styling */
:deep(.custom-search .n-input-wrapper) {
  background-color: #f3f4f6 !important; /* bg-gray-100 */
  border: none !important;
  border-radius: 9999px !important;
}

:deep(.custom-search .n-input__border),
:deep(.custom-search .n-input__state-border) {
  border: none !important;
}

:deep(.custom-search.n-input--focus .n-input-wrapper) {
  background-color: white !important;
  box-shadow: 0 0 0 2px #dbeafe !important; /* ring-blue-100 */
}
</style>
