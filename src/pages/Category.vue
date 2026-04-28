<script setup lang="ts">
import { ref, onMounted } from "vue";
import GlobalTables, { type TableColumn } from "../components/GlobalTables.vue";
import Actions from "../components/Actions.vue";
import { categoryService } from "../services/categoryService";

interface CategoryData {
  id: number;
  name: string;
  type: string;
  status: boolean;
}

// Kolom tabel
const categoryColumns: TableColumn[] = [
  { key: "name", label: "Category Name" },
  { key: "type", label: "Types" },
  { key: "status", label: "Status" },
  { key: "actions", label: "Aksi" },
];

// Contoh data
const categoryData = ref<CategoryData[]>([]);

const fetchCategories = async () => {
  try {
    const data = await categoryService.getCategories();
    categoryData.value = data;
  } catch (error: any) {
    console.error("Gagal mengambil data kategori:", error);
    // Di sini bisa ditambahkan logika untuk menampilkan notifikasi error (seperti toast/alert)
  }
};

onMounted(() => {
  fetchCategories();
});

const showAddDialog = ref(false);

const newCategory = ref({
  name: "",
  type: "expense",
  status: true,
});

const handleAddCategory = async () => {
  if (!newCategory.value.name.trim()) {
    alert("Nama kategori harus diisi");
    return;
  }
  
  try {
    const createdCategory = await categoryService.createCategory({
      name: newCategory.value.name,
      type: newCategory.value.type,
      status: newCategory.value.status,
    });
    
    // Tambahkan data yang dikembalikan dari API ke dalam tabel
    categoryData.value.push(createdCategory);
    
    closeAddDialog();
  } catch (error: any) {
    console.error("Gagal menambahkan kategori:", error);
    alert("Gagal menambahkan kategori: " + (error.message || "Silakan coba lagi."));
  }
};

const closeAddDialog = () => {
  showAddDialog.value = false;
  newCategory.value = {
    name: "",
    type: "expense",
    status: true,
  };
};

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
        @click="showAddDialog = true"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
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
            row.status
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          "
        >
          {{ row.status ? 'Aktif' : 'Tidak Aktif' }}
        </span>
      </template>
    </GlobalTables>

    <!-- Modal Tambah Kategori -->
    <div v-if="showAddDialog" class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity backdrop-blur-sm" @click="closeAddDialog"></div>
      
      <!-- Modal Panel -->
      <div class="relative w-full max-w-lg p-4 mx-auto my-6 z-50">
        <div class="relative bg-white rounded-xl shadow-2xl flex flex-col w-full outline-none focus:outline-none overflow-hidden transform transition-all">
          
          <!-- Header -->
          <div class="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/80">
            <h3 class="text-lg font-semibold text-gray-900">
              Tambah Kategori
            </h3>
            <button @click="closeAddDialog" class="p-2 ml-auto text-gray-400 bg-transparent border-0 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors focus:outline-none">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          
          <!-- Body -->
          <div class="relative p-6 flex-auto">
            <div class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1" for="categoryName">
                  Nama Kategori
                </label>
                <input v-model="newCategory.name" class="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm" id="categoryName" type="text" placeholder="Masukkan nama kategori">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1" for="categoryType">
                  Tipe
                </label>
                <select v-model="newCategory.type" class="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm" id="categoryType">
                  <option value="expense">Pengeluaran (Expense)</option>
                  <option value="income">Pemasukan (Income)</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1" for="categoryStatus">
                  Status
                </label>
                <select v-model="newCategory.status" class="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm" id="categoryStatus">
                  <option :value="true">Aktif</option>
                  <option :value="false">Tidak Aktif</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="flex items-center justify-end p-5 border-t border-gray-100 bg-gray-50/80 gap-3">
            <button @click="closeAddDialog" type="button" class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm">
              Batal
            </button>
            <button @click="handleAddCategory" type="button" class="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm" :disabled="!newCategory.name.trim()" :class="{'opacity-50 cursor-not-allowed': !newCategory.name.trim()}">
              Simpan
            </button>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>
