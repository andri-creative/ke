<script setup lang="ts">
import { SearchOutline, FlashOutline, MenuOutline } from "@vicons/ionicons5";
import UserProfile from "./UserProfile.vue";

const emit = defineEmits(["toggleSidebar"]);
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 h-14 flex items-center px-3 justify-between bg-[#ECECEC] z-40 border-b border-gray-200/50"
  >
    <!-- Left Section: Hamburger + Logo (Aligned with Sidebar) -->
    <div class="flex items-center">
      <!-- Mobile/Tablet Menu Button (Garis Tiga) - Far Left -->

      <!-- Logo (Fixed size w-10 to match Sidebar) -->
      <div class="flex items-center gap-3">
        <div
          class="bg-[#84934A]! rounded-full! flex items-center justify-center w-10 h-10 shrink-0 shadow-sm"
        >
          <FlashOutline class="text-white w-5 h-5" />
        </div>
      </div>
      <button
        @click="$emit('toggleSidebar')"
        class="p-2 mr-1 hover:bg-gray-200 rounded-lg transition-colors lg:hidden text-[#492828]"
      >
        <MenuOutline class="w-6 h-6" />
      </button>
    </div>

    <!-- Search Bar Area -->
    <div class="flex-1 max-w-md mx-4 hidden sm:block">
      <div class="relative flex items-center group">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <SearchOutline class="w-4 h-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Cari sesuatu..."
          class="block w-full pl-10 pr-3 py-1.5 bg-white! border-none! text-sm rounded-full! transition-all outline-none focus:ring-2 focus:ring-[#84934A]/20 text-gray-700 shadow-sm"
        />
      </div>
    </div>

    <!-- Right Section -->
    <div class="flex items-center gap-2">
      <button
        class="p-2 hover:bg-gray-200 rounded-lg transition-colors sm:hidden text-[#492828]"
      >
        <SearchOutline class="w-5 h-5" />
      </button>
      <UserProfile />
    </div>
  </header>
</template>
