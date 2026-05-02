<script setup lang="ts">
import { computed } from 'vue'

type Mode = 'create' | 'edit' | 'view'

const props = defineProps<{
  modelValue: {
    name: string
    type: string
    status: boolean
  }
  mode?: Mode
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: typeof props.modelValue): void
  (e: 'close'): void
  (e: 'submit'): void
}>()

const localCategory = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const isReadonly = computed(() => props.mode === 'view')

const title = computed(() => {
  if (props.mode === 'edit') return 'Edit Kategori'
  if (props.mode === 'view') return 'Detail Kategori'
  return 'Tambah Kategori'
})

const submitLabel = computed(() => {
  if (props.mode === 'edit') return 'Update'
  return 'Simpan'
})
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto"
  >
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black/20 transition-opacity backdrop-blur-sm"
      @click="emit('close')"
    ></div>

    <!-- Modal Panel -->
    <div class="relative w-full max-w-md p-4 mx-auto my-6 z-50">
      <div
        class="relative bg-white rounded-xl shadow-2xl flex flex-col w-full outline-none focus:outline-none overflow-hidden transform transition-all"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/80"
        >
          <h3 class="text-base font-semibold text-gray-800">
            {{ title }}
          </h3>
          <button
            @click="emit('close')"
            class="p-1.5 ml-auto text-gray-400 bg-transparent border-0 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors focus:outline-none"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="relative p-4 flex-auto">
          <div class="space-y-4">
            <div>
              <label
                class="block text-xs font-medium text-gray-600 mb-1"
                for="categoryName"
              >
                Nama Kategori
              </label>
              <input
                v-model="localCategory.name"
                class="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
                id="categoryName"
                type="text"
                :readonly="isReadonly"
                :class="{ 'bg-gray-100 cursor-not-allowed': isReadonly }"
                placeholder="Masukkan nama kategori"
              />
            </div>

            <div>
              <label
                class="block text-xs font-medium text-gray-600 mb-1"
                for="categoryType"
              >
                Tipe
              </label>
              <select
                v-model="localCategory.type"
                class="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
                id="categoryType"
                :disabled="isReadonly"
                :class="{ 'bg-gray-100 cursor-not-allowed': isReadonly }"
              >
                <option value="expense">Pengeluaran (Expense)</option>
                <option value="income">Pemasukan (Income)</option>
              </select>
            </div>

            <div>
              <label
                class="block text-xs font-medium text-gray-600 mb-1"
                for="categoryStatus"
              >
                Status
              </label>
              <select
                v-model="localCategory.status"
                class="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
                id="categoryStatus"
                :disabled="isReadonly"
                :class="{ 'bg-gray-100 cursor-not-allowed': isReadonly }"
              >
                <option :value="true">Aktif</option>
                <option :value="false">Tidak Aktif</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="flex items-center justify-end px-4 py-3 border-t border-gray-100 bg-gray-50/80 gap-2"
        >
          <button
            @click="emit('close')"
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors shadow-sm"
          >
            {{ isReadonly ? 'Tutup' : 'Batal' }}
          </button>
          <button
            v-if="!isReadonly"
            @click="emit('submit')"
            type="button"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors shadow-sm"
            :disabled="!localCategory.name.trim()"
            :class="{
              'opacity-50 cursor-not-allowed': !localCategory.name.trim(),
            }"
          >
            {{ submitLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
