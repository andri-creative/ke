<script setup lang="ts">
withDefaults(
  defineProps<{
    show?: boolean
    edit?: boolean
    delete?: boolean
  }>(),
  {
    show: false,
    edit: false,
    delete: false,
  },
)

const emit = defineEmits<{
  (e: 'show'): void
  (e: 'edit'): void
  (e: 'delete'): void
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <!-- Show Button -->
    <div v-if="show" class="relative group">
      <button
        @click="emit('show')"
        class="p-1.5 text-blue-500 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors cursor-pointer"
      >
        <svg
          class="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-width="2"
            d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
          />
          <path
            stroke="currentColor"
            stroke-width="2"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </button>
      <div
        class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50"
      >
        View Details
        <!-- Arrow -->
        <div
          class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"
        ></div>
      </div>
    </div>

    <!-- Edit Button -->
    <div v-if="edit" class="relative group">
      <button
        @click="emit('edit')"
        class="p-1.5 text-yellow-600 bg-yellow-50 hover:bg-yellow-100 rounded-md transition-colors cursor-pointer"
      >
        <svg
          class="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
          />
        </svg>
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

    <!-- Delete Button -->
    <div v-if="delete" class="relative group">
      <button
        @click="emit('delete')"
        class="p-1.5 text-red-500 bg-red-50 hover:bg-red-100 rounded-md transition-colors cursor-pointer"
      >
        <svg
          class="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1v12M6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7H6m12-1V5h-4l-1-1h-3L9 5H5v1h13M8 9h1v10H8V9m6 0h1v10h-1V9Z" />
        </svg>
      </button>
      <div
        class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50"
      >
        Delete
        <!-- Arrow -->
        <div
          class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"
        ></div>
      </div>
    </div>
  </div>
</template>
