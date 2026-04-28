<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authService } from "../services/authService";

const router = useRouter();
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    await authService.login(email.value, password.value);
    router.push("/home");
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : "Terjadi kesalahan saat login.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div
    class="min-h-screen w-full flex items-center justify-center bg-slate-50 font-sans"
  >
    <div
      class="w-full max-w-md p-10 bg-white rounded-2xl shadow-sm border border-slate-200"
    >
      <div class="mb-10">
        <h1 class="text-2xl font-bold text-slate-900 mb-1">Sign In</h1>
        <p class="text-slate-500 text-sm">
          Enter your credentials to access your account
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <p v-if="errorMessage" class="text-sm text-red-600">
          {{ errorMessage }}
        </p>

        <!-- Username Field -->
        <div class="space-y-2">
          <label for="email" class="text-sm font-semibold text-slate-700"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="email"
            class="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all duration-200"
            required
          />
        </div>

        <!-- Password Field -->
        <div class="space-y-2">
          <label for="password" class="text-sm font-semibold text-slate-700"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="••••••••"
            class="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all duration-200"
            required
          />
        </div>

        <!-- Login Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors duration-200 mt-2"
        >
          {{ isLoading ? "Loading..." : "Continue" }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Minimalist styling */
</style>
