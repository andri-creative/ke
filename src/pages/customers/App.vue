<script setup lang="ts">
import { ref } from 'vue'
import GlobalTables from '../../components/GlobalTables.vue'
import StatusComponents from '../../components/StatusComponents.vue'
import Actions from '../../components/Actions.vue'
import DeleteDialog from '../../components/DeleteDialog.vue'

interface Customer {
  id: number
  name: string
  email: string
  familyPhone: string
  avatar?: string
  status: string
}

const columns = [
  { key: 'avatar', label: 'Avatar' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'familyPhone', label: 'Family Phone' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Aksi ' },
]

const customers = ref<Customer[]>([
  {
    id: 1,
    avatar: 'https://i.pravatar.cc/100?img=12',
    name: 'Andri Wijaya',
    email: 'andri@example.com',
    familyPhone: '+62 812-1111-2222',
    status: 'Active',
  },
  {
    id: 2,
    avatar: '',
    name: 'Sinta Maharani',
    email: 'sinta@example.com',
    familyPhone: '+62 813-3333-4444',
    status: 'Inactive',
  },
  {
    id: 3,
    avatar: 'https://i.pravatar.cc/100?img=33',
    name: 'Raka Pratama',
    email: 'raka@example.com',
    familyPhone: '+62 815-7777-8888',
    status: 'Active',
  },
])

const isDeleteDialogOpen = ref(false)
const customerToDelete = ref<Customer | null>(null)

const getFirstNameInitial = (name: string) => {
  const firstName = name.trim().split(' ')[0] ?? ''
  return firstName.charAt(0).toUpperCase()
}

const handleShow = (row: Customer) => {
  console.log(row)
}

const handleEdit = (row: Customer) => {
  console.log(row)
}

const handleDelete = (row: Customer) => {
  customerToDelete.value = row
  isDeleteDialogOpen.value = true
  console.log(row)
}

const closeDeleteDialog = () => {
  isDeleteDialogOpen.value = false
  customerToDelete.value = null
}

const confirmDeleteCustomer = () => {
  if (!customerToDelete.value) return

  customers.value = customers.value.filter(
    (item) => item.id !== customerToDelete.value?.id,
  )
  closeDeleteDialog()
}
</script>

<template>
  <section class="space-y-4">
    <h1 class="text-lg sm:text-xl font-semibold text-body">Customer List</h1>

    <GlobalTables :columns="columns" :data="customers">
      <template #avatar="{ row }">
        <div
          class="relative inline-flex items-center justify-center group z-20"
        >
          <div
            class="absolute z-50 left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 text-sm font-medium text-white bg-dark rounded-base shadow-xs whitespace-nowrap opacity-0 invisible transition-opacity duration-300 group-hover:opacity-100 group-hover:visible pointer-events-none"
          >
            {{ row.name }}
          </div>

          <img
            v-if="row.avatar"
            class="w-10 h-10 rounded-full object-cover shrink-0"
            :src="row.avatar"
            :alt="`${row.name} avatar`"
          />

          <div
            v-else
            class="w-10 h-10 rounded-full bg-neutral-secondary-medium text-body flex items-center justify-center text-sm font-semibold shrink-0"
          >
            {{ getFirstNameInitial(row.name) }}
          </div>
        </div>
      </template>

      <template #status="{ row }">
        <StatusComponents :value="row.status" />
      </template>

      <!-- Slot untuk kolom 'actions' -->
      <template #actions="{ row }">
        <Actions
          show
          edit
          delete
          @show="handleShow(row)"
          @edit="handleEdit(row)"
          @delete="handleDelete(row)"
        />
      </template>
    </GlobalTables>

    <DeleteDialog
      :open="isDeleteDialogOpen"
      title="Delete Customer"
      :name="`${customerToDelete?.name ?? ''}`"
      :message="`Are you sure you want to delete customer ${customerToDelete?.name ?? ''}?`"
      confirm-text="Yes, Delete"
      cancel-text="Cancel"
      @close="closeDeleteDialog"
      @confirm="confirmDeleteCustomer"
    />
  </section>
</template>
