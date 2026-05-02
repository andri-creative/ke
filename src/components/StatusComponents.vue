<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    value: string | boolean | null | undefined
  }>(),
  {
    value: 'inactive',
  },
)

const normalizedStatus = computed(() => {
  if (typeof props.value === 'boolean') {
    return props.value ? 'active' : 'inactive'
  }

  const rawValue = String(props.value ?? '')
    .trim()
    .toLowerCase()

  if (rawValue === 'active') return 'active'
  if (rawValue === 'inactive') return 'inactive'
  if (rawValue === 'suspended') return 'suspended'
  if (rawValue === 'blocked') return 'blocked'
  if (rawValue === 'disabled') return 'disabled'
  if (rawValue === 'deleted') return 'deleted'
  if (rawValue === 'pending activation') return 'pending activation'
  if (rawValue === 'deactivated') return 'deactivated'

  return 'inactive'
})

const statusClass = computed(() => {
  const classMap: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-700',
    suspended: 'bg-amber-100 text-amber-800',
    blocked: 'bg-red-100 text-red-800',
    disabled: 'bg-neutral-200 text-neutral-700',
    deleted: 'bg-rose-100 text-rose-800',
    'pending activation': 'bg-blue-100 text-blue-800',
    deactivated: 'bg-orange-100 text-orange-800',
  }

  return classMap[normalizedStatus.value] ?? classMap.inactive
})

const label = computed(() => {
  const labelMap: Record<string, string> = {
    active: 'Active',
    inactive: 'Inactive',
    suspended: 'Suspended',
    blocked: 'Blocked',
    disabled: 'Disabled',
    deleted: 'Deleted',
    'pending activation': 'Pending Activation',
    deactivated: 'Deactivated',
  }

  return labelMap[normalizedStatus.value] ?? 'Inactive'
})
</script>

<template>
  <kbd
    class="inline-flex px-2 py-1 text-xs rounded-full font-medium"
    :class="statusClass"
  >
    {{ label }}
  </kbd>
</template>
