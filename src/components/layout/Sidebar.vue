<script setup lang="ts">
import { NLayoutSider, NMenu, NButton, NIcon } from "naive-ui";
import {
  ChevronBackOutline,
  ChevronForwardOutline,
  LayersOutline,
} from "@vicons/ionicons5";
import { menuOptions } from "../../config/menu";

const collapsed = defineModel<boolean>("collapsed", { default: false });
const activeKey = defineModel<string>("activeKey", { default: "home" });
</script>

<template>
  <n-layout-sider
    collapse-mode="width"
    :collapsed-width="80"
    :width="240"
    :collapsed="collapsed"
    class="bg-[#ECECEC]! transition-all duration-300"
    content-class="flex flex-col justify-between py-4 px-3 h-full"
  >
    <div class="flex flex-col gap-2 overflow-hidden">
      <!-- Sidebar Brand -->
      <div class="flex items-center gap-3 px-3 mb-6 overflow-hidden h-10">
        <div
          class="bg-blue-600! p-2 rounded-lg! shrink-0 flex items-center justify-center"
        >
          <n-icon class="text-white w-5 h-5" :component="LayersOutline" />
        </div>
        <span
          v-if="!collapsed"
          class="font-bold text-gray-700 whitespace-nowrap"
          >Andri Dev</span
        >
      </div>

      <!-- Menu Items -->
      <n-menu
        v-model:value="activeKey"
        :collapsed="collapsed"
        :collapsed-width="80"
        :collapsed-icon-size="24"
        :options="menuOptions"
        class="bg-transparent custom-menu"
      />
    </div>

    <!-- Bottom Collapse Button -->
    <div class="border-t border-gray-300 pt-4 px-1">
      <n-button
        quaternary
        block
        @click="collapsed = !collapsed"
        class="justify-start px-2 h-12 rounded-xl hover:bg-white hover:text-blue-600 transition-all group"
      >
        <template #icon>
          <n-icon size="24" class="text-gray-500 group-hover:text-blue-600">
            <component
              :is="collapsed ? ChevronForwardOutline : ChevronBackOutline"
            />
          </n-icon>
        </template>
        <span
          v-if="!collapsed"
          class="font-medium text-gray-600 group-hover:text-blue-600"
          >Collapse Sidebar</span
        >
      </n-button>
    </div>
  </n-layout-sider>
</template>

<style scoped>
/* Custom styling for Naive UI Menu */
:deep(.n-menu-item-content) {
  padding-left: 12px !important;
  padding-right: 12px !important;
  border-radius: 12px !important;
  margin-bottom: 4px !important;
  transition: all 0.3s !important;
}

:deep(.n-menu-item-content:hover) {
  background-color: white !important;
  color: #2563eb !important;
}

:deep(.n-menu-item-content--selected) {
  background-color: white !important;
  color: #2563eb !important;
}

:deep(.n-menu-item-content.n-menu-item-content--selected .n-menu-item-content-header) {
  color: #2563eb !important;
  font-weight: 500 !important;
}

:deep(.n-menu-item-content .n-menu-item-content-header) {
  color: #4b5563 !important;
}

:deep(.n-menu-item-content:hover .n-menu-item-content-header) {
  color: #2563eb !important;
}

:deep(.n-menu-item-content .n-icon) {
  color: #4b5563 !important;
}

:deep(.n-menu-item-content:hover .n-icon),
:deep(.n-menu-item-content--selected .n-icon) {
  color: #2563eb !important;
}

:deep(.n-layout-sider-scroll-container) {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
