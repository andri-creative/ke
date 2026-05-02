<script setup lang="ts">
import { ref } from 'vue'
import GlobalTables, {
  type TableColumn,
} from '../../components/GlobalTables.vue'
import Actions from '../../components/Actions.vue'
import StatusComponents from '../../components/StatusComponents.vue'
import RoleFormModal from '../../components/RoleFormModal.vue'
import DeleteDialog from '../../components/DeleteDialog.vue'
import { computed } from 'vue'

interface RoleData {
  id: number
  name: string
  slug: string
  description: string
  status: boolean
}

// Kolom tabel
const roleColumns: TableColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'slug', label: 'Slug' },
  { key: 'description', label: 'Deskripsi' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Aksi' },
]

// Data dummy
const roleData = ref<RoleData[]>([
  {
    id: 1,
    name: 'Administrator',
    slug: 'admin',
    description: 'Memiliki akses penuh ke seluruh sistem',
    status: true,
  },
  {
    id: 2,
    name: 'Manager',
    slug: 'manager',
    description: 'Bisa melihat laporan dan mengelola staf',
    status: true,
  },
  {
    id: 3,
    name: 'Kasir',
    slug: 'cashier',
    description: 'Melakukan input dan transaksi harian',
    status: false,
  },
])

type DialogMode = 'create' | 'edit' | 'view' | null

const dialogMode = ref<DialogMode>(null)
const selectedRole = ref<RoleData | null>(null)
const isDeleteDialogOpen = ref(false)
const roleToDelete = ref<RoleData | null>(null)

const formRole = ref({
  name: '',
  slug: '',
  description: '',
  status: true,
})

const isDialogOpen = computed(() => dialogMode.value !== null)

const openCreateDialog = () => {
  dialogMode.value = 'create'
  formRole.value = {
    name: '',
    slug: '',
    description: '',
    status: true,
  }
  selectedRole.value = null
}

const openEditDialog = (row: RoleData) => {
  dialogMode.value = 'edit'
  selectedRole.value = row
  formRole.value = {
    name: row.name,
    slug: row.slug,
    description: row.description,
    status: row.status,
  }
}

const openViewDialog = (row: RoleData) => {
  dialogMode.value = 'view'
  selectedRole.value = row
  formRole.value = {
    name: row.name,
    slug: row.slug,
    description: row.description,
    status: row.status,
  }
}

const closeDialog = () => {
  dialogMode.value = null
  selectedRole.value = null
  formRole.value = {
    name: '',
    slug: '',
    description: '',
    status: true,
  }
}

const handleSubmit = () => {
  if (!formRole.value.name.trim() || !formRole.value.slug.trim()) {
    alert('Nama dan Slug harus diisi')
    return
  }

  if (dialogMode.value === 'create') {
    const newId =
      roleData.value.length > 0
        ? Math.max(...roleData.value.map((r) => r.id)) + 1
        : 1
    roleData.value.push({
      id: newId,
      name: formRole.value.name,
      slug: formRole.value.slug,
      description: formRole.value.description,
      status: formRole.value.status,
    })
    closeDialog()
    return
  }

  if (dialogMode.value === 'edit' && selectedRole.value) {
    const index = roleData.value.findIndex(
      (item) => item.id === selectedRole.value?.id,
    )
    if (index !== -1) {
      roleData.value[index] = {
        ...roleData.value[index],
        name: formRole.value.name,
        slug: formRole.value.slug,
        description: formRole.value.description,
        status: formRole.value.status,
      }
    }
    closeDialog()
  }
}

const handleShow = (row: RoleData) => {
  openViewDialog(row)
}

const handleEdit = (row: RoleData) => {
  openEditDialog(row)
}

const handleDelete = (row: RoleData) => {
  roleToDelete.value = row
  isDeleteDialogOpen.value = true
}

const closeDeleteDialog = () => {
  isDeleteDialogOpen.value = false
  roleToDelete.value = null
}

const confirmDeleteRole = () => {
  if (!roleToDelete.value) return

  roleData.value = roleData.value.filter((item) => item.id !== roleToDelete.value?.id)
  closeDeleteDialog()
}
</script>

<template>
  <div class="w-full h-full pb-8">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6"
    >
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-gray-800">
          Manajemen Role
        </h1>
        <p class="text-sm sm:text-base text-gray-500 mt-1">
          Daftar hak akses dan peran pengguna
        </p>
      </div>
      <button
        @click="openCreateDialog"
        class="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm sm:text-base rounded-md hover:bg-blue-700 transition-colors shadow-sm"
      >
        Tambah Role
      </button>
    </div>

    <!-- Tabel menggunakan GlobalTables -->
    <GlobalTables :columns="roleColumns" :data="roleData" showCheckbox>
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

      <!-- Slot untuk kolom 'status' dengan badge warna -->
      <template #status="{ row }">
        <StatusComponents :value="row.status" />
      </template>
    </GlobalTables>
    <!-- Modal (Tambah / Edit / Detail) -->
    <RoleFormModal
      v-model:modelValue="formRole"
      :mode="dialogMode || 'create'"
      :open="isDialogOpen"
      @close="closeDialog"
      @submit="handleSubmit"
    />

    <DeleteDialog
      :open="isDeleteDialogOpen"
      title="Delete Role"
      :name="`${roleToDelete?.name ?? ''}`"
      :message="`Are you sure you want to delete role ${roleToDelete?.name ?? ''}?`"
      confirm-text="Yes, Delete"
      cancel-text="Cancel"
      @close="closeDeleteDialog"
      @confirm="confirmDeleteRole"
    />
  </div>
</template>
