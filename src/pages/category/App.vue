<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import GlobalTables, {
  type TableColumn,
} from '../../components/GlobalTables.vue'
import Actions from '../../components/Actions.vue'
import StatusComponents from '../../components/StatusComponents.vue'
import CategoryFormModal from '../../components/CategoryFormModal.vue'
import { categoryService } from '../../services/categoryService'
import DeleteDialog from '../../components/DeleteDialog.vue'

interface CategoryData {
  id: number
  name: string
  type: string
  status: boolean
}

type DialogMode = 'create' | 'edit' | 'view' | null

const CATEGORIES_CACHE_KEY = 'ke.categories.list'

function loadCachedCategories(): CategoryData[] {
  try {
    const raw = sessionStorage.getItem(CATEGORIES_CACHE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as CategoryData[]) : []
  } catch {
    return []
  }
}

function persistCategoriesCache(list: CategoryData[]) {
  try {
    sessionStorage.setItem(CATEGORIES_CACHE_KEY, JSON.stringify(list))
  } catch {
    // quota / private mode
  }
}

// Kolom tabel
const categoryColumns: TableColumn[] = [
  { key: 'name', label: 'Category Name' },
  { key: 'type', label: 'Types' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Aksi' },
]

const categoryData = ref<CategoryData[]>(loadCachedCategories())
/** Hanya untuk tabel kosong: hindari “Data tidak tersedia” saat masih fetch pertama */
const listLoading = ref(categoryData.value.length === 0)

const fetchCategories = async () => {
  listLoading.value = categoryData.value.length === 0
  try {
    const data = await categoryService.getCategories()
    categoryData.value = data
    persistCategoriesCache(data)
  } catch (error: any) {
    console.error('Gagal mengambil data kategori:', error)
  } finally {
    listLoading.value = false
  }
}

onMounted(() => {
  fetchCategories()
})

const dialogMode = ref<DialogMode>(null)
const selectedCategory = ref<CategoryData | null>(null)
// Delete
const isDeleteDialogOpen = ref(false)
const categoryToDelete = ref<CategoryData | null>(null)

const formCategory = ref({
  name: '',
  type: 'expense',
  status: true,
})

const isDialogOpen = computed(() => dialogMode.value !== null)

const openCreateDialog = () => {
  dialogMode.value = 'create'
  formCategory.value = {
    name: '',
    type: 'expense',
    status: true,
  }
  selectedCategory.value = null
}

const openEditDialog = (row: CategoryData) => {
  dialogMode.value = 'edit'
  selectedCategory.value = row
  formCategory.value = {
    name: row.name,
    type: row.type,
    status: row.status,
  }
}

const openViewDialog = (row: CategoryData) => {
  dialogMode.value = 'view'
  selectedCategory.value = row
  formCategory.value = {
    name: row.name,
    type: row.type,
    status: row.status,
  }
}

const closeDialog = () => {
  dialogMode.value = null
  selectedCategory.value = null
  formCategory.value = {
    name: '',
    type: 'expense',
    status: true,
  }
}

const handleSubmit = async () => {
  if (!formCategory.value.name.trim()) {
    alert('Nama kategori harus diisi')
    return
  }

  if (dialogMode.value === 'create') {
    try {
      const createdCategory = await categoryService.createCategory({
        name: formCategory.value.name,
        type: formCategory.value.type,
        status: formCategory.value.status,
      })

      categoryData.value.push(createdCategory)
      persistCategoriesCache(categoryData.value)
      closeDialog()
    } catch (error: any) {
      console.error('Gagal menambahkan kategori:', error)
      alert(
        'Gagal menambahkan kategori: ' +
          (error.message || 'Silakan coba lagi.'),
      )
    }
    return
  }

  if (dialogMode.value === 'edit' && selectedCategory.value) {
    const index = categoryData.value.findIndex(
      (item) => item.id === selectedCategory.value?.id,
    )
    if (index !== -1) {
      categoryData.value[index] = {
        ...categoryData.value[index],
        name: formCategory.value.name,
        type: formCategory.value.type,
        status: formCategory.value.status,
      }
    }
    persistCategoriesCache(categoryData.value)
    closeDialog()
  }
}

const handleEdit = (row: CategoryData) => {
  openEditDialog(row)
}

const handleShow = (row: CategoryData) => {
  openViewDialog(row)
}

const handleDelete = (row: CategoryData) => {
  categoryToDelete.value = row
  isDeleteDialogOpen.value = true
}

const closeDeleteDialog = () => {
  isDeleteDialogOpen.value = false
  categoryToDelete.value = null
}

const confirmDeleteCategory = () => {
  if (!categoryToDelete.value) return

  categoryData.value = categoryData.value.filter(
    (item) => item.id !== categoryToDelete.value?.id,
  )
  persistCategoriesCache(categoryData.value)
  closeDeleteDialog()
}
</script>

<template>
  <div>
    <!-- Contoh Header -->
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6"
    >
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-gray-800">
          Manajemen Kategori
        </h1>
        <p class="text-sm sm:text-base text-gray-500 mt-1">
          Daftar kategori produk
        </p>
      </div>
      <button
        @click="openCreateDialog"
        class="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm sm:text-base rounded-md hover:bg-blue-700 transition-colors shadow-sm"
      >
        Tambah Kategori
      </button>
    </div>

    <!-- Menggunakan GlobalTables -->
    <GlobalTables
      :columns="categoryColumns"
      :data="categoryData"
      showCheckbox
      :loading="listLoading"
    >
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

      <!-- Contoh slot untuk kolom 'status' agar tampilannya beda -->
      <template #status="{ row }">
        <StatusComponents :value="row.status" />
      </template>
    </GlobalTables>

    <!-- Modal (Tambah / Edit / Detail) menggunakan komponen terpisah -->
    <CategoryFormModal
      v-model:modelValue="formCategory"
      :mode="dialogMode || 'create'"
      :open="isDialogOpen"
      @close="closeDialog"
      @submit="handleSubmit"
    />

    <DeleteDialog
      :open="isDeleteDialogOpen"
      title="Delete Category"
      :name="`${categoryToDelete?.name ?? ''}`"
      :message="`Are you sure you want to delete Category ${categoryToDelete?.name ?? ''}?`"
      confirm-text="Yes, Delete"
      cancel-text="Cancel"
      @close="closeDeleteDialog"
      @confirm="confirmDeleteCategory"
    />
  </div>
</template>
