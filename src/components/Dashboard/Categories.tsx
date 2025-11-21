'use client'
import { Category } from '@/type/Categories';
import { Edit, Eye, Plus, Search, Trash2, FolderOpen, Sparkles, TrendingUp } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState, useMemo, memo } from 'react';
import CategoryDeletePopup from './CategoryDelete';
import CategoryFormPopup from './CategoryForm';

interface CategoriesPageProps {
    categories: Category[];
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
    onAddCategory?: (categoryData: Partial<Category>) => void;
    onEditCategory?: (categoryData: Partial<Category>) => void;
    onDeleteCategory?: (categoryId: string) => void;
}

const CategoryRow = memo(({
    category,
    onEdit,
    onDelete
}: {
    category: Category;
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
}) => (
    <tr className="border-b border-gray-100/50 hover:bg-blue-50/30 transition-colors duration-150 group">
        <td className="py-6 px-6">
            <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                    <FolderOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div className="space-y-1">
                    <p className="font-semibold text-gray-900">
                        {category.name}
                    </p>
                    <p className="text-sm text-gray-500">#{category._id.slice(-6)}</p>
                </div>
            </div>
        </td>
        <td className="py-6 px-6">
            <p className="text-gray-700 line-clamp-2 max-w-md">
                {category.description}
            </p>
        </td>
        <td className="py-6 px-6">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-mono bg-gray-100 text-gray-700 border border-gray-300">
                {category.slug}
            </span>
        </td>
        <td className="py-6 px-6">
            <div className="flex items-center justify-center space-x-2">
                <button
                    onClick={() => onEdit(category)}
                    className="p-2.5 text-green-600 hover:bg-green-100 rounded-xl transition-colors duration-150"
                    title="Chỉnh sửa"
                >
                    <Edit size={18} />
                </button>
                <button
                    onClick={() => onDelete(category)}
                    className="p-2.5 text-red-600 hover:bg-red-100 rounded-xl transition-colors duration-150"
                    title="Xóa danh mục"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </td>
    </tr>
));

const CategoriesPage = ({
    categories,
    searchTerm,
    setSearchTerm,
    onAddCategory,
    onEditCategory,
    onDeleteCategory
}: CategoriesPageProps) => {
    const [editCategory, setEditCategory] = useState<Category | null>(null);
    const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const filteredCategories = useMemo(() => {
        if (!searchTerm.trim()) return categories;

        const searchLower = searchTerm.toLowerCase();
        return categories.filter((category: Category) =>
            category.name.toLowerCase().includes(searchLower) ||
            category.description.toLowerCase().includes(searchLower)
        );
    }, [categories, searchTerm]);

    const handleEditCategory = (category: Category) => {
        setEditCategory(category);
    };

    const handleDeleteCategory = (category: Category) => {
        setDeleteCategory(category);
    };

    const handleAddCategory = (categoryData: Partial<Category>) => {
        if (onAddCategory) {
            onAddCategory(categoryData);
        }
        setShowAddForm(false);
    };

    const handleUpdateCategory = (categoryData: Partial<Category>) => {
        if (onEditCategory) {
            onEditCategory(categoryData);
        }
        setEditCategory(null);
    };

    const handleConfirmDelete = async () => {
        if (deleteCategory && onDeleteCategory) {
            setIsDeleting(true);
            try {
                onDeleteCategory(deleteCategory._id);
                setDeleteCategory(null);
            } catch (error) {
                console.error('Error deleting category:', error);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section - Giảm backdrop-blur */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                                    <FolderOpen className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        Quản lý Danh mục
                                    </h1>
                                    <div className="flex items-center space-x-4 mt-1">
                                        <p className="text-gray-600 flex items-center">
                                            <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                                            Tổng cộng <span className="font-semibold text-blue-600 mx-1">{categories.length}</span> danh mục
                                        </p>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Sparkles className="h-4 w-4 mr-1" />
                                            {filteredCategories.length} hiển thị
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-150 flex items-center gap-3 font-medium"
                        >
                            <Plus size={20} />
                            <span>Thêm danh mục mới</span>
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên hoặc mô tả danh mục..."
                            value={searchTerm}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 bg-white text-gray-700 placeholder-gray-500"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-left py-6 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider">Tên danh mục</th>
                                    <th className="text-left py-6 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider">Mô tả</th>
                                    <th className="text-left py-6 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider">Slug</th>
                                    <th className="text-center py-6 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCategories.map((category: Category) => (
                                    <CategoryRow
                                        key={category._id}
                                        category={category}
                                        onEdit={handleEditCategory}
                                        onDelete={handleDeleteCategory}
                                    />
                                ))}
                            </tbody>
                        </table>

                        {filteredCategories.length === 0 && (
                            <div className="text-center py-16">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                    <FolderOpen className="h-8 w-8 text-gray-400" />
                                </div>
                                <p className="text-gray-500 text-lg font-medium">Không tìm thấy danh mục nào</p>
                                <p className="text-gray-400 text-sm mt-1">Thử thay đổi từ khóa tìm kiếm</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={`fixed inset-0 z-50 ${showAddForm ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${showAddForm ? 'opacity-50' : 'opacity-0'}`} onClick={() => setShowAddForm(false)} />
                <div className={`absolute inset-0 flex items-center justify-center p-4 transition-all duration-300 ${showAddForm ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <CategoryFormPopup
                        isOpen={showAddForm}
                        onClose={() => setShowAddForm(false)}
                        onSubmit={handleAddCategory}
                        isEdit={false}
                    />
                </div>
            </div>

            <div className={`fixed inset-0 z-50 ${editCategory ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${editCategory ? 'opacity-50' : 'opacity-0'}`} onClick={() => setEditCategory(null)} />
                <div className={`absolute inset-0 flex items-center justify-center p-4 transition-all duration-300 ${editCategory ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <CategoryFormPopup
                        category={editCategory}
                        isOpen={!!editCategory}
                        onClose={() => setEditCategory(null)}
                        onSubmit={handleUpdateCategory}
                        isEdit={true}
                    />
                </div>
            </div>

            <div className={`fixed inset-0 z-50 ${deleteCategory ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${deleteCategory ? 'opacity-50' : 'opacity-0'}`} onClick={() => setDeleteCategory(null)} />
                <div className={`absolute inset-0 flex items-center justify-center p-4 transition-all duration-300 ${deleteCategory ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <CategoryDeletePopup
                        category={deleteCategory}
                        isOpen={!!deleteCategory}
                        onClose={() => setDeleteCategory(null)}
                        onConfirm={handleConfirmDelete}
                        isDeleting={isDeleting}
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoriesPage;