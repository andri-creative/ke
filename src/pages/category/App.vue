<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import GlobalTables, { type TableColumn } from "../../components/GlobalTables.vue";
import Actions from "../../components/Actions.vue";
import CategoryFormModal from "../../components/CategoryFormModal.vue";
import { categoryService } from "../../services/categoryService";

interface CategoryData {
    id: number;
    name: string;
    type: string;
    status: boolean;
}

type DialogMode = "create" | "edit" | "view" | null;

// Kolom tabel
const categoryColumns: TableColumn[] = [
    { key: "name", label: "Category Name" },
    { key: "type", label: "Types" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Aksi" },
];

const categoryData = ref<CategoryData[]>([]);

const fetchCategories = async () => {
    try {
        const data = await categoryService.getCategories();
        categoryData.value = data;
    } catch (error: any) {
        console.error("Gagal mengambil data kategori:", error);
    }
};

onMounted(() => {
    fetchCategories();
});

const dialogMode = ref<DialogMode>(null);
const selectedCategory = ref<CategoryData | null>(null);

const formCategory = ref({
    name: "",
    type: "expense",
    status: true,
});

const isDialogOpen = computed(() => dialogMode.value !== null);

const openCreateDialog = () => {
    dialogMode.value = "create";
    formCategory.value = {
        name: "",
        type: "expense",
        status: true,
    };
    selectedCategory.value = null;
};

const openEditDialog = (row: CategoryData) => {
    dialogMode.value = "edit";
    selectedCategory.value = row;
    formCategory.value = {
        name: row.name,
        type: row.type,
        status: row.status,
    };
};

const openViewDialog = (row: CategoryData) => {
    dialogMode.value = "view";
    selectedCategory.value = row;
    formCategory.value = {
        name: row.name,
        type: row.type,
        status: row.status,
    };
};

const closeDialog = () => {
    dialogMode.value = null;
    selectedCategory.value = null;
    formCategory.value = {
        name: "",
        type: "expense",
        status: true,
    };
};

const handleSubmit = async () => {
    if (!formCategory.value.name.trim()) {
        alert("Nama kategori harus diisi");
        return;
    }

    if (dialogMode.value === "create") {
        try {
            const createdCategory = await categoryService.createCategory({
                name: formCategory.value.name,
                type: formCategory.value.type,
                status: formCategory.value.status,
            });

            categoryData.value.push(createdCategory);
            closeDialog();
        } catch (error: any) {
            console.error("Gagal menambahkan kategori:", error);
            alert("Gagal menambahkan kategori: " + (error.message || "Silakan coba lagi."));
        }
        return;
    }

    if (dialogMode.value === "edit" && selectedCategory.value) {
        const index = categoryData.value.findIndex((item) => item.id === selectedCategory.value?.id);
        if (index !== -1) {
            categoryData.value[index] = {
                ...categoryData.value[index],
                name: formCategory.value.name,
                type: formCategory.value.type,
                status: formCategory.value.status,
            };
        }
        closeDialog();
    }
};

const handleEdit = (row: CategoryData) => {
    openEditDialog(row);
};

const handleShow = (row: CategoryData) => {
    openViewDialog(row);
};

const handleDelete = (row: CategoryData) => {
    categoryData.value = categoryData.value.filter((item) => item.id !== row.id);
};
</script>

<template>
    <div>
        <!-- Contoh Header -->
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
                <h1 class="text-xl sm:text-2xl font-bold text-gray-800">Manajemen Kategori</h1>
                <p class="text-sm sm:text-base text-gray-500 mt-1">Daftar kategori produk</p>
            </div>
            <button @click="openCreateDialog"
                class="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm sm:text-base rounded-md hover:bg-blue-700 transition-colors shadow-sm">
                Tambah Kategori
            </button>
        </div>

        <!-- Menggunakan GlobalTables -->
        <GlobalTables :columns="categoryColumns" :data="categoryData" showCheckbox>
            <!-- Slot untuk kolom 'actions' -->
            <template #actions="{ row }">
                <Actions show edit delete @show="handleShow(row)" @edit="handleEdit(row)" @delete="handleDelete(row)" />
            </template>

            <!-- Contoh slot untuk kolom 'status' agar tampilannya beda -->
            <template #status="{ row }">
                <span class="px-2 py-1 text-xs rounded-full" :class="row.status
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    ">
                    {{ row.status ? 'Aktif' : 'Tidak Aktif' }}
                </span>
            </template>
        </GlobalTables>

        <!-- Modal (Tambah / Edit / Detail) menggunakan komponen terpisah -->
        <CategoryFormModal v-model:modelValue="formCategory" :mode="dialogMode || 'create'" :open="isDialogOpen"
            @close="closeDialog" @submit="handleSubmit" />
    </div>
</template>
