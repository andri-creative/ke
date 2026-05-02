<script setup lang="ts">
withDefaults(
  defineProps<{
    open: boolean
    title?: string
    name?: string
    message?: string
    warningText?: string
    confirmText?: string
    cancelText?: string
  }>(),
  {
    title: 'Delete Confirmation',
    name: '-',
    message: 'Are you sure you want to delete this data?',
    warningText: 'This action cannot be undone.',
    confirmText: 'Yes, Delete',
    cancelText: 'No, Cancel',
  },
)

const emit = defineEmits<{  
  (e: 'close'): void
  (e: 'confirm'): void
}>()
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
  >
    <div class="relative w-full max-w-md overflow-hidden rounded-base bg-white shadow-lg">
      <div class="bg-red-600 px-5 py-4 text-white">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h3 class="text-lg font-semibold leading-6">{{ title }}</h3>
            <p class="mt-1 text-sm text-red-100">Name: {{ name }}</p>
          </div>
          <button
            type="button"
            class="inline-flex h-8 w-8 items-center justify-center rounded-base text-white/90 hover:bg-white/15 hover:text-white"
            @click="emit('close')"
          >
            <svg
              class="w-5 h-5"
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
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
      </div>

      <div class="px-5 py-4">
        <p class="text-sm text-body">{{ message }}</p>
        <div
          class="mt-3 rounded-base border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800"
        >
          Warning: {{ warningText }}
        </div>
      </div>

      <div class="flex items-center justify-end gap-3 border-t border-default px-5 py-4">
        <button
          type="button"
          class="rounded-base border border-default-medium bg-neutral-secondary-medium px-4 py-2.5 text-sm font-medium leading-5 text-body shadow-xs hover:bg-neutral-tertiary-medium hover:text-heading focus:outline-none focus:ring-4 focus:ring-neutral-tertiary"
          @click="emit('close')"
        >
          {{ cancelText }}
        </button>
        <button
          type="button"
          class="rounded-base border border-transparent bg-danger px-4 py-2.5 text-sm font-medium leading-5 text-white shadow-xs hover:bg-danger-strong focus:outline-none focus:ring-4 focus:ring-danger-medium"
          @click="emit('confirm')"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>
