<script setup lang="ts">
import { ref, h, type Component } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { 
  NLayout, 
  NLayoutSider, 
  NLayoutHeader, 
  NLayoutContent, 
  NMenu, 
  NButton, 
  NSpace, 
  NIcon,
  NInput,
  NAvatar,
  NBadge,
  MenuOption
} from 'naive-ui';
import {
  HomeOutline,
  FolderOutline,
  PeopleOutline,
  LayersOutline,
  GitPullRequestOutline,
  ListOutline,
  FlagOutline,
  ClipboardOutline,
  PulseOutline,
  CloudDownloadOutline,
  AppsOutline,
  FlaskOutline,
  ConstructOutline,
  ShieldCheckmarkOutline,
  SearchOutline,
  NotificationsOutline,
  AddOutline,
  HelpCircleOutline,
  LogOutOutline,
  ChevronBackOutline,
  ChevronForwardOutline,
  BulbOutline
} from '@vicons/ionicons5';

// Import font
import 'vfonts/Inter.css';

const router = useRouter();
const collapsed = ref(false);

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions: MenuOption[] = [
  {
    label: 'Home',
    key: 'home',
    icon: renderIcon(HomeOutline),
  },
  {
    label: 'Projects',
    key: 'projects',
    icon: renderIcon(FolderOutline),
  },
  {
    label: 'Groups',
    key: 'groups',
    icon: renderIcon(PeopleOutline),
  },
  {
    label: 'Work items',
    key: 'work-items',
    icon: renderIcon(LayersOutline),
  },
  {
    label: 'Merge requests',
    key: 'merge-requests',
    icon: renderIcon(GitPullRequestOutline),
    extra: () => h(NBadge, { value: 2, dot: false, type: 'info' })
  },
  {
    label: 'To-Do List',
    key: 'todo',
    icon: renderIcon(ListOutline),
  },
  {
    label: 'Milestones',
    key: 'milestones',
    icon: renderIcon(FlagOutline),
  },
  {
    label: 'Snippets',
    key: 'snippets',
    icon: renderIcon(ClipboardOutline),
  },
  {
    label: 'Activity',
    key: 'activity',
    icon: renderIcon(PulseOutline),
  },
  {
    label: 'Import history',
    key: 'import-history',
    icon: renderIcon(CloudDownloadOutline),
  },
  {
    label: 'Workspaces',
    key: 'workspaces',
    icon: renderIcon(AppsOutline),
  },
  {
    label: 'Environments',
    key: 'environments',
    icon: renderIcon(FlaskOutline),
  },
  {
    label: 'Operations',
    key: 'operations',
    icon: renderIcon(ConstructOutline),
  },
  {
    label: 'Security',
    key: 'security',
    icon: renderIcon(ShieldCheckmarkOutline),
  }
];

const handleLogout = () => {
  router.push('/');
};
</script>

<template>
  <n-layout position="absolute" class="h-screen">
    <!-- Top Header -->
    <n-layout-header bordered class="h-12 flex items-center px-4 justify-between bg-white z-20">
      <n-space align="center" :size="16">
        <div class="flex items-center space-x-2">
           <div class="w-8 h-8 bg-[#6b4fbb] rounded-md flex items-center justify-center">
              <svg viewBox="0 0 512 512" class="w-5 h-5 text-white" fill="currentColor">
                 <path d="M503.5 204.6L402.2 11.2c-4-7.7-12-11.2-19.9-8.4-7.9 2.8-12.8 10.3-12.2 18.7l13.3 183.1H128.6L141.9 21.5c.6-8.4-4.3-15.9-12.2-18.7-7.9-2.8-15.9.7-19.9 8.4L8.5 204.6c-4.4 8.4-3.6 18.7 2.1 26.2l209.6 270c5.5 7.1 14.1 11.2 23.2 11.2s17.7-4.1 23.2-11.2l209.6-270c5.7-7.5 6.5-17.8 2.1-26.2z"/>
              </svg>
           </div>
        </div>
        <div class="text-sm font-semibold text-slate-800">Your work</div>
      </n-space>

      <div class="flex-1 max-w-xl mx-4">
        <n-input round placeholder="Search or go to..." class="bg-slate-50 border-none shadow-inner">
          <template #prefix>
            <n-icon><SearchOutline /></n-icon>
          </template>
        </n-input>
      </div>

      <n-space align="center" :size="12">
        <n-button quaternary circle size="small"><template #icon><n-icon><AddOutline /></n-icon></template></n-button>
        <n-badge :value="2" :offset="[4, 0]"><n-button quaternary circle size="small"><template #icon><n-icon><NotificationsOutline /></n-icon></template></n-button></n-badge>
        <n-button quaternary circle size="small"><template #icon><n-icon><HelpCircleOutline /></n-icon></template></n-button>
        <n-avatar round size="small" src="https://0.gravatar.com/avatar/94d715a754c5b848ef01019551d04498?s=64" />
      </n-space>
    </n-layout-header>

    <n-layout has-sider position="absolute" style="top: 48px;">
      <!-- Sidebar -->
      <n-layout-sider
        collapse-mode="width"
        :collapsed-width="64"
        :width="260"
        :collapsed="collapsed"
        bordered
        class="bg-[#f2f2f7]"
      >
        <div class="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider" v-if="!collapsed">
           Your work
        </div>
        <n-menu
          v-model:value="activeKey"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="20"
          :options="menuOptions"
          class="bg-transparent"
        />
        
        <div class="absolute bottom-0 left-0 w-full p-2 border-t border-slate-200 bg-transparent">
           <n-space vertical :size="4">
              <n-button quaternary block class="justify-start px-2" v-if="!collapsed">
                 <template #icon><n-icon><BulbOutline /></n-icon></template>
                 What's new <n-badge :value="9" class="ml-auto" />
              </n-button>
              <n-button quaternary block class="justify-start px-2" v-if="!collapsed">
                 <template #icon><n-icon><HelpCircleOutline /></n-icon></template>
                 Help
              </n-button>
              <n-button quaternary block @click="collapsed = !collapsed" class="justify-start px-2">
                 <template #icon>
                   <n-icon><component :is="collapsed ? ChevronForwardOutline : ChevronBackOutline" /></n-icon>
                 </template>
                 {{ collapsed ? '' : 'Collapse sidebar' }}
              </n-button>
              <n-button quaternary block @click="handleLogout" class="justify-start px-2" v-if="!collapsed">
                 <template #icon><n-icon><LogOutOutline /></n-icon></template>
                 Logout
              </n-button>
           </n-space>
        </div>
      </n-layout-sider>

      <!-- Main Content -->
      <n-layout-content :native-scrollbar="false" class="bg-white">
         <div class="p-4 border-b border-slate-100 flex items-center text-xs text-slate-500 space-x-2">
            <span>Your work</span>
            <span>/</span>
            <span class="font-semibold text-slate-900">Home</span>
         </div>
         <div class="p-6">
            <router-view />
         </div>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped>
:deep(.n-menu-item-content--selected) {
  background-color: #e2e2ed !important;
  color: #000 !important;
}
:deep(.n-menu-item-content:hover) {
  background-color: rgba(0,0,0,0.05) !important;
}
</style>
