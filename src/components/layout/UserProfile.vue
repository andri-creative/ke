<script setup lang="ts">
import { NAvatar, NDropdown, NButton, NIcon } from "naive-ui";
import type { Component } from "vue";
import {
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  PersonCircleOutline as UserIcon,
} from "@vicons/ionicons5";
import { h } from "vue";

function renderIcon(icon: Component) {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
}

const options = [
  {
    label: "User Profile",
    key: "profile",
    icon: renderIcon(UserIcon),
  },
  {
    label: "Edit Profile",
    key: "editProfile",
    icon: renderIcon(EditIcon),
  },
  {
    label: "Logout",
    key: "logout",
    icon: renderIcon(LogoutIcon),
  },
];
</script>

<template>
  <div class="flex items-center gap-3">
    <n-dropdown trigger="click" :options="options" :style="{ width: '160px' }">
      <n-button quaternary circle class="p-0! h-10! w-10! overflow-hidden">
        <div
          class="w-10 h-10 rounded-full! bg-linear-to-tr from-blue-500 to-indigo-600 p-px shadow-lg!"
        >
          <div
            class="bg-white w-full h-full rounded-full overflow-hidden p-px flex items-center justify-center"
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Andri"
              alt="Avatar"
              class="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </n-button>
    </n-dropdown>
  </div>
</template>
