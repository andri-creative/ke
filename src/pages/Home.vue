<script setup lang="ts">
import { 
  NGrid, 
  NGi, 
  NCard, 
  NText, 
  NIcon, 
  NButton, 
  NSpace, 
  NTabs, 
  NTab,
  NSelect
} from 'naive-ui';
import {
  CheckmarkCircleOutline,
  GitPullRequestOutline,
  LayersOutline,
  OptionsOutline,
  TimeOutline,
  CopyOutline
} from '@vicons/ionicons5';
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-6">
    
    <!-- Top Grid: Stats & Quick Access -->
    <n-grid :x-gap="24" :y-gap="24" :cols="12">
      <!-- Left Column: Merge Requests & Work Items -->
      <n-gi :span="8">
        <n-grid :x-gap="24" :y-gap="24" :cols="2">
          <!-- Merge Request Card 1 -->
          <n-gi>
            <n-card bordered class="h-full rounded-xl">
              <template #header>
                <div class="flex justify-between items-center w-full">
                  <span class="text-slate-500 font-medium">Merge requests</span>
                  <n-icon class="text-slate-400 cursor-pointer hover:text-slate-600"><OptionsOutline /></n-icon>
                </div>
              </template>
              <div class="space-y-1">
                <div class="text-5xl font-bold text-slate-900">0</div>
                <div class="text-slate-600 text-sm font-medium">Waiting for your review</div>
                <div class="text-slate-400 text-xs">Just now</div>
              </div>
            </n-card>
          </n-gi>

          <!-- Merge Request Card 2 -->
          <n-gi>
            <n-card bordered class="h-full rounded-xl">
              <template #header>
                <div class="flex justify-between items-center w-full">
                  <span class="text-slate-500 font-medium">Merge requests</span>
                  <n-icon class="text-slate-400 cursor-pointer hover:text-slate-600"><OptionsOutline /></n-icon>
                </div>
              </template>
              <div class="space-y-1">
                <div class="text-5xl font-bold text-slate-900">2</div>
                <div class="text-slate-600 text-sm font-medium">Assigned to you</div>
                <div class="text-slate-400 text-xs">2 weeks ago</div>
              </div>
            </n-card>
          </n-gi>

          <!-- Work Item Card 1 -->
          <n-gi>
            <n-card bordered class="h-full rounded-xl">
              <template #header>
                <div class="flex justify-between items-center w-full">
                  <span class="text-slate-500 font-medium">Work items</span>
                  <n-icon class="text-slate-400 cursor-pointer hover:text-slate-600"><CopyOutline /></n-icon>
                </div>
              </template>
              <div class="space-y-1">
                <div class="text-5xl font-bold text-slate-900">0</div>
                <div class="text-slate-600 text-sm font-medium">Assigned to you</div>
                <div class="text-slate-400 text-xs">Just now</div>
              </div>
            </n-card>
          </n-gi>

          <!-- Work Item Card 2 -->
          <n-gi>
            <n-card bordered class="h-full rounded-xl">
              <template #header>
                <div class="flex justify-between items-center w-full">
                  <span class="text-slate-500 font-medium">Work items</span>
                  <n-icon class="text-slate-400 cursor-pointer hover:text-slate-600"><CopyOutline /></n-icon>
                </div>
              </template>
              <div class="space-y-1">
                <div class="text-5xl font-bold text-slate-900">0</div>
                <div class="text-slate-600 text-sm font-medium">Authored by you</div>
                <div class="text-slate-400 text-xs">Just now</div>
              </div>
            </n-card>
          </n-gi>
        </n-grid>
      </n-gi>

      <!-- Right Column: Quick Access -->
      <n-gi :span="4">
        <n-card bordered class="h-full rounded-xl">
          <template #header>
            <span class="text-slate-900 font-bold">Quick access</span>
          </template>
          
          <div class="space-y-6">
            <div class="flex border border-slate-200 rounded-lg overflow-hidden">
               <button class="flex-1 py-1.5 px-3 text-xs font-semibold bg-slate-100 text-slate-900 border-r border-slate-200">Recently viewed</button>
               <button class="flex-1 py-1.5 px-3 text-xs font-semibold text-slate-500 hover:bg-slate-50">Projects</button>
            </div>
            
            <p class="text-slate-500 text-sm text-center py-4">
               Issues and merge requests you visit will appear here.
            </p>
          </div>
        </n-card>
      </n-gi>
    </n-grid>

    <!-- Bottom Card: Attention -->
    <n-card bordered class="rounded-xl mt-6">
       <template #header>
          <div class="flex justify-between items-center w-full">
             <span class="text-slate-900 font-bold">Items that need your attention</span>
             <n-select size="small" :options="[{label:'Everything', value:1}]" value="1" class="w-32" />
          </div>
       </template>

       <div class="py-8 flex flex-col items-center text-center space-y-4">
          <div class="w-16 h-16 bg-[#d1fadf] rounded-full flex items-center justify-center border-4 border-white shadow-sm ring-1 ring-emerald-100">
             <n-icon size="32" color="#18a058"><CheckmarkCircleOutline /></n-icon>
          </div>
          <div>
             <p class="text-slate-900 font-bold text-lg">Good job! <span class="font-medium text-slate-600 text-base">All your to-do items are done.</span></p>
          </div>
          <n-button text type="primary" class="font-semibold text-sm">
             All to-do items
          </n-button>
       </div>
    </n-card>

  </div>
</template>

<style scoped>
.n-card {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
}
</style>