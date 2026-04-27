<script setup lang="ts">
import { ref } from "vue";
import { NLayout, NLayoutContent } from "naive-ui";
import Header from "../components/layout/Header.vue";
import Sidebar from "../components/layout/Sidebar.vue";
import Breadcrumb from "../components/layout/Breadcrumb.vue";

// Import font
import "vfonts/Inter.css";

const collapsed = ref(false);
const activeKey = ref("home");
</script>

<template>
  <n-layout position="absolute" class="h-screen bg-[#ECECEC]">
    <!-- Top Header -->
    <Header />

    <n-layout
      has-sider
      position="absolute"
      style="top: 56px"
      class="bg-[#ECECEC]! pb-4"
    >
      <!-- Sidebar -->
      <Sidebar v-model:collapsed="collapsed" v-model:active-key="activeKey" />

      <!-- Main Content Area -->
      <n-layout-content
        :native-scrollbar="false"
        class="ms-4 me-4 rounded-xl! shadow-sm! overflow-hidden"
        content-style="height: 100%; display: flex; flex-direction: column; background-color: #FBFBFB;"
      >
        <!-- Panel Header (Breadcrumb) -->
        <Breadcrumb />

        <!-- Pane Content -->
        <div class="flex-1 p-1 pr-3 pl-3 overflow-y-auto custom-scrollbar">
          <router-view />
        </div>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d1d1;
  border-radius: 4px;
  border: 1px solid transparent;
  background-clip: padding-box;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #b5b5b5;
}
</style>

