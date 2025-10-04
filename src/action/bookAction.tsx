import { Book } from '@/type/Book';
import { toast } from 'react-hot-toast';

export const addBook = async (bookData: Partial<Book>): Promise<boolean> => {
    try {
        const formData = new FormData();

        if (bookData.title) formData.append('title', bookData.title);
        if (bookData.author) formData.append('author', bookData.author);
        if (bookData.category?._id) formData.append('categoryId', bookData.category._id);
        if (bookData.price) formData.append('price', bookData.price.toString());
        if (bookData.description) formData.append('description', bookData.description);
        if (bookData.publishedYear) formData.append('publishedYear', bookData.publishedYear.toString());
        if (bookData.imageUrl) formData.append('imageUrl', bookData.imageUrl);
        if (bookData.stock !== undefined) formData.append('stock', bookData.stock.toString());

        const response = await fetch('/api/books/add', {
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
        console.error('Error adding book:', error);
        toast.error('Có lỗi xảy ra khi thêm sách!');
        return false;
    }
};

export const editBook = async (bookData: Partial<Book>): Promise<boolean> => {
    try {
        if (!bookData._id) {
            toast.error('ID sách không hợp lệ!');
            return false;
        }

        const formData = new FormData();

        if (bookData.title) formData.append('title', bookData.title);
        if (bookData.author) formData.append('author', bookData.author);
        if (bookData.category?._id) formData.append('categoryId', bookData.category._id);
        if (bookData.price !== undefined) formData.append('price', bookData.price.toString());
        if (bookData.description) formData.append('description', bookData.description);
        if (bookData.publishedYear) formData.append('publishedYear', bookData.publishedYear.toString());
        if (bookData.imageUrl) formData.append('imageUrl', bookData.imageUrl);
        if (bookData.stock !== undefined) formData.append('stock', bookData.stock.toString());

        const response = await fetch(`/api/books/${bookData._id}`, {
            method: 'PATCH',
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            toast.success('Cập nhật sách thành công!');
            return true;
        } else {
            toast.error(result.error || 'Có lỗi xảy ra khi cập nhật sách!');
            return false;
        }
    } catch (error) {
        console.error('Error editing book:', error);
        toast.error('Có lỗi xảy ra khi cập nhật sách!');
        return false;
    }
};

export const deleteBook = async (bookId: string): Promise<boolean> => {
    try {
        if (!bookId) {
            toast.error('ID sách không hợp lệ!');
            return false;
        }

        const response = await fetch(`/api/books/${bookId}`, {
            method: 'DELETE',
        });

        const result = await response.json();

        if (result.success) {
            toast.success('Xóa sách thành công!');
            return true;
        } else {
            toast.error(result.error || 'Có lỗi xảy ra khi xóa sách!');
            return false;
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        toast.error('Có lỗi xảy ra khi xóa sách!');
        return false;
    }
};

export const fetchBooks = async (): Promise<Book[]> => {
    try {
        const response = await fetch('/api/books', {
            method: 'GET',
        });

        const result = await response.json();

        if (Array.isArray(result)) {
            return result;
        } else {
            return [];
        }

    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
};