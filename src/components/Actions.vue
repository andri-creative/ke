<script setup lang="ts">
import {
  EyeOutline as ShowIcon,
  Pencil as EditIcon,
  TrashOutline as DeleteIcon,
} from "@vicons/ionicons5";

withDefaults(
  defineProps<{
    show?: boolean;
    edit?: boolean;
    delete?: boolean;
  }>(),
  {
    show: false,
    edit: false,
    delete: false,
  },
);

const emit = defineEmits<{
  (e: "show"): void;
  (e: "edit"): void;
  (e: "delete"): void;
}>();
</script>

<template>
  <div class="flex items-center gap-2">
    <!-- Tombol Show -->
    <div v-if="show" class="relative group">
      <button
        @click="emit('show')"
        class="p-1.5 text-blue-500 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors cursor-pointer"
      >
        <ShowIcon class="w-4 h-4" />
      </button>
      <div
        class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50"
      >
        Lihat Detail
        <!-- Arrow -->
        <div
          class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"
        ></div>
      </div>
    </div>

    <!-- Tombol Edit -->
    <div v-if="edit" class="relative group">
      <button
        @click="emit('edit')"
        class="p-1.5 text-yellow-600 bg-yellow-50 hover:bg-yellow-100 rounded-md transition-colors cursor-pointer"
      >
        <EditIcon class="w-4 h-4" />
      </button>
      <div
        class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50"
      >
        Edit
        <!-- Arrow -->
        <div
          class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"
        ></div>
      </div>
    </div>

    <!-- Tombol Delete -->
    <div v-if="delete" class="relative group">
      <button
        @click="emit('delete')"
        class="p-1.5 text-red-500 bg-red-50 hover:bg-red-100 rounded-md transition-colors cursor-pointer"
      >
        <DeleteIcon class="w-4 h-4" />
      </button>
      <div
        class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50"
      >
        Hapus
        <!-- Arrow -->
        <div
          class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"
        ></div>
      </div>
    </div>
  </div>
</template>
