<script setup lang="ts" generic="T extends Record<string, any>">
import { defineProps } from "vue";

export interface TableColumn {
  key: string;
  label: string;
}

const props = defineProps<{
  columns: TableColumn[];
  data: T[];
  showCheckbox?: boolean;
}>();
</script>

<template>
  <div
    class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default w-full"
  >
    <table class="w-full text-xs sm:text-sm text-left rtl:text-right text-body whitespace-nowrap">
      <thead
        class="text-xs sm:text-sm text-body bg-neutral-secondary-medium border-b border-default-medium"
      >
        <tr>
          <!-- Checkbox Header -->
          <th v-if="showCheckbox" scope="col" class="p-3 sm:p-4 w-4">
            <div class="flex items-center">
              <input
                type="checkbox"
                class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
              />
            </div>
          </th>

          <!-- Dynamic Headers -->
          <th
            v-for="col in columns"
            :key="col.key"
            scope="col"
            class="px-3 py-2 sm:px-6 sm:py-3 font-medium"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in data"
          :key="index"
          class="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium"
        >
          <!-- Checkbox Cell -->
          <td v-if="showCheckbox" class="p-3 sm:p-4 w-4">
            <div class="flex items-center">
              <input
                type="checkbox"
                class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
              />
            </div>
          </td>

          <!-- Dynamic Cells -->
          <td v-for="col in columns" :key="col.key" class="px-3 py-3 sm:px-6 sm:py-4">
            <!-- 
              Slot Dinamis: memungkinkan Anda mengubah tampilan kolom tertentu.
              Contoh saat menggunakan komponen:
              <template #actions="{ row }">
                <button @click="hapus(row)">Hapus</button>
              </template>
            -->
            <slot :name="col.key" :row="row" :index="index">
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>

        <!-- Empty State -->
        <tr v-if="data.length === 0">
          <td
            :colspan="showCheckbox ? columns.length + 1 : columns.length"
            class="px-3 py-6 sm:px-6 sm:py-8 text-center text-gray-500"
          >
            Data tidak tersedia
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
