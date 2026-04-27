<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import {
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  PersonCircleOutline as UserIcon,
} from "@vicons/ionicons5";
import { api } from "../../config/api";

type LoggedInUser = {
  name?: string;
  email?: string;
  role?: string;
};

type MeResponse = {
  user?: LoggedInUser;
  data?: LoggedInUser;
};

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const router = useRouter();
const TOKEN_KEY = "accessToken";
const USER_KEY = "loggedInUser";

const getCachedUser = (): LoggedInUser | null => {
  const rawUser = localStorage.getItem(USER_KEY);
  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as LoggedInUser;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

const user = ref<LoggedInUser | null>(getCachedUser());

const getLoggedInUser = async () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return;
  }

  const clientTime = new Date().toISOString();

  try {
    const response = await fetch(api.user, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "x-client-time": clientTime,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem(TOKEN_KEY);
        router.push("/");
      }
      return;
    }

    const result: MeResponse = await response.json();
    user.value = result.user ?? result.data ?? null;
    if (user.value) {
      localStorage.setItem(USER_KEY, JSON.stringify(user.value));
    }
  } catch (error) {
    console.error("Get profile API error:", error);
  }
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

const handleLogout = async () => {
  const clientTime = new Date().toISOString();
  const token = localStorage.getItem(TOKEN_KEY);

  try {
    await fetch(api.logout, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-time": clientTime,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  } catch (error) {
    console.error("Logout API error:", error);
  } finally {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    isOpen.value = false;
    router.push("/");
  }
};

onMounted(() => {
  window.addEventListener("click", closeDropdown);
  void getLoggedInUser();
});

onUnmounted(() => {
  window.removeEventListener("click", closeDropdown);
});
</script>

<template>
  <div class="flex items-center gap-2 relative" ref="dropdownRef">
    <div class="text-right hidden md:block leading-tight select-none">
      <p class="text-[11px] font-bold text-[#492828]">{{ user?.name ?? "-" }}</p>
      <p class="text-[9px] text-[#492828]/50 font-medium">
        {{ user?.role ?? "User" }}
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
          <p class="text-[12px] font-bold text-[#492828]">{{ user?.name ?? "-" }}</p>
          <p class="text-[10px] text-[#492828]/50 truncate">
            {{ user?.email ?? "-" }}
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
