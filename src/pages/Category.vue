<script setup lang="ts">
import { ref } from "vue";
import GlobalTables, { type TableColumn } from "../components/GlobalTables.vue";
import Actions from "../components/Actions.vue";

interface CategoryData {
  id: number;
  name: string;
  type: string;
  status: string;
}

// Kolom tabel
const categoryColumns: TableColumn[] = [
  { key: "name", label: "Category Name" },
  { key: "type", label: "Types" },
  { key: "status", label: "Status" },
  { key: "actions", label: "Aksi" },
];

// Contoh data
const categoryData = ref<CategoryData[]>([
  {
    id: 1,
    name: "Elektronik",
    type: "Fisik",
    status: "Aktif",
  },
  {
    id: 2,
    name: "Fashion Pria",
    type: "Fisik",
    status: "Aktif",
  },
  {
    id: 3,
    name: "Software",
    type: "Digital",
    status: "Tidak Aktif",
  },
]);

const handleEdit = (row: CategoryData) => {
  console.log("Edit:", row);
};

const handleShow = (row: CategoryData) => {
  console.log("Show:", row);
};

const handleDelete = (row: CategoryData) => {
  console.log("Delete:", row);
  categoryData.value = categoryData.value.filter((item) => item.id !== row.id);
};
</script>

<template>
  <div>
    <!-- Contoh Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Manajemen Kategori</h1>
        <p class="text-gray-500 mt-1">Daftar kategori produk</p>
      </div>
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Tambah Kategori
      </button>
    </div>

    <!-- Menggunakan GlobalTables -->
    <GlobalTables :columns="categoryColumns" :data="categoryData" showCheckbox>
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
        <span
          class="px-2 py-1 text-xs rounded-full"
          :class="
            row.status === 'Aktif'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          "
        >
          {{ row.status }}
        </span>
      </template>
    </GlobalTables>
  </div>
</template>
