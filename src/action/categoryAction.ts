import { Category } from "@/type/Categories";
import toast from "react-hot-toast";

export const fetchCategories = async (): Promise<Category[]> => {
    try {
        const response = await fetch('/api/categories', {
            method: 'GET',
        });

        const result = await response.json();

        if (Array.isArray(result)) {
            return result;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

export const addCategory = async (categoryData: Partial<Category>): Promise<boolean> => {
    try {
        const formData = new FormData();

        if (categoryData.name) formData.append('name', categoryData.name);
        if (categoryData.description) formData.append('description', categoryData.description);

        const response = await fetch('/api/categories/add', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            toast.success('Thêm sách thành công!');
            return true;
        } else {
            toast.error(result.error || 'Có lỗi xảy ra khi thêm sách!');
            return false;
        }
    } catch (error) {
        console.error('Error adding category:', error);
        toast.error('Có lỗi xảy ra khi thêm danh mục!');
        return false;
    }
};

export const editCategory = async (categoryData: Partial<Category>): Promise<boolean> => {
    try {
        if (!categoryData._id) {
            toast.error('ID sách không hợp lệ!');
            return false;
        }

        const formData = new FormData();

        if (categoryData.name) formData.append('name', categoryData.name);
        if (categoryData.description) formData.append('description', categoryData.description);
      
        const response = await fetch(`/api/categories/${categoryData._id}`, {
            method: 'PATCH',
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            toast.success('Cập nhật sách thành công!');
            return true;
        } else {
            toast.error(result.error || 'Có lỗi xảy ra khi cập nhật danh mục!');
            return false;
        }
    } catch (error) {
        console.error('Error editing category:', error);
        toast.error('Có lỗi xảy ra khi cập nhật danh mục!');
        return false;
    }
};


export const deleteCategory = async (categoryId: string): Promise<boolean> => {
    try {
        if (!categoryId) {
            toast.error('ID sách không hợp lệ!');
            return false;
        }

        const response = await fetch(`/api/categories/${categoryId}`, {
            method: 'DELETE',
        });

        const result = await response.json();

        if (result.success) {
            toast.success('Xóa danh mục thành công!');
            return true;
        } else {
            toast.error(result.error || 'Có lỗi xảy ra khi xóa danh mục!');
            return false;
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        toast.error('Có lỗi xảy ra khi xóa danh mục!');
        return false;
    }
};