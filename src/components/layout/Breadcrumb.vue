<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, type RouteLocationRaw } from 'vue-router';

const route = useRoute();

interface BreadcrumbItem {
  label: string;
  isLast: boolean;
  to?: RouteLocationRaw;
}

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const currentRouteName = (route.name as string) || '';
  
  if (!currentRouteName || currentRouteName === 'home') {
    return [{ label: 'Home', isLast: true }];
  }
  
  // Format: capitalize first letter (e.g., 'category' -> 'Category')
  const formattedName = currentRouteName.charAt(0).toUpperCase() + currentRouteName.slice(1);
  
  return [
    { label: 'Home', isLast: false, to: { name: 'home' } },
    { label: formattedName, isLast: true }
  ];
});
</script>

<template>
  <div class="py-5 border-b border-surface px-3 bg-transparent">
    <nav class="flex items-center text-sm font-medium">
      <template v-for="(item, index) in breadcrumbs" :key="index">
        <!-- Current/Last Item -->
        <span 
          v-if="item.isLast" 
          class="text-accent font-bold tracking-tight"
        >
          {{ item.label }}
        </span>
        
        <!-- Previous Items -->
        <template v-else>
          <router-link 
            :to="item.to || '/'" 
            class="text-accent/50 hover:text-secondary transition-colors"
          >
            {{ item.label }}
          </router-link>
          <span class="mx-2 text-surface-dark font-light">/</span>
        </template>
      </template>
    </nav>
  </div>
</template>

<style scoped>
.text-surface-dark {
  color: #d1d1d1;
}
</style>
