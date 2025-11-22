'use client'
import { Book } from '@/type/Book';
import { Category } from '@/type/Categories';
import { X, BookOpen, User, Tag, DollarSign, Calendar, Image, FileText, Package } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface BookFormPopupProps {
    book?: Book | null;
    categories: Category[];
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (bookData: Partial<Book>) => void;
    isEdit?: boolean;
}

const BookFormPopup = ({ book, categories, isOpen, onClose, onSubmit, isEdit = false }: BookFormPopupProps) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        categoryId: '',
        price: '',
        stock: '',
        description: '',
        publishedYear: '',
        imageUrl: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isEdit && book) {
            setFormData({
                title: book.title || '',
                author: book.author || '',
                categoryId: book.category._id || '',
                price: book.price?.toString() || '',
                stock: book.stock?.toString() || '',
                description: book.description || '',
                publishedYear: book.publishedYear?.toString() || '',
                imageUrl: book.imageUrl || ''
            });
        } else {
            setFormData({
                title: '',
                author: '',
                categoryId: '',
                price: '',
                stock: '',
                description: '',
                publishedYear: '',
                imageUrl: ''
            });
        }
    }, [book, isEdit, isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData: Partial<Book> = {
            title: formData.title,
            author: formData.author,
            category: categories.find(cat => cat._id === formData.categoryId),
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            description: formData.description,
            publishedYear: formData.publishedYear ? parseInt(formData.publishedYear) : undefined,
            imageUrl: formData.imageUrl
        };

        if (isEdit && book) {
            submitData._id = book._id;
        }

        onSubmit(submitData);
        setIsSubmitting(false);
    };

    if (!isOpen) return null;

    return (
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-white">
                            {isEdit ? 'Chỉnh sửa sách' : 'Thêm sách mới'}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 z-30 hover:bg-white/20 rounded-lg transition-colors duration-150"
                    >
                        <X size={20} className="text-white" />
                    </button>
                </div>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                                Tên sách <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 bg-gray-50 hover:bg-white"
                                placeholder="Nhập tên sách..."
                            />
                        </div>

                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                <User className="h-4 w-4 mr-2 text-green-500" />
                                Tác giả <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-150 bg-gray-50 hover:bg-white"
                                placeholder="Nhập tên tác giả..."
                            />
                        </div>

                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                <Tag className="h-4 w-4 mr-2 text-purple-500" />
                                Danh mục <span className="text-red-500 ml-1">*</span>
                            </label>
                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-150 bg-gray-50 hover:bg-white appearance-none"
                            >
                                <option value="">Chọn danh mục</option>
                                {categories.map((category: Category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                <DollarSign className="h-4 w-4 mr-2 text-yellow-500" />
                                Giá <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                                min="0"
                                step="1000"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-150 bg-gray-50 hover:bg-white"
                                placeholder="Nhập giá sách..."
                            />
                        </div>

                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                <Package className="h-4 w-4 mr-2 text-orange-500" />
                                Số lượng tồn kho <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleInputChange}
                                required
                                min="0"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-150 bg-gray-50 hover:bg-white"
                                placeholder="Nhập số lượng..."
                            />
                        </div>

                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                                Năm xuất bản
                            </label>
                            <input
                                type="number"
                                name="publishedYear"
                                value={formData.publishedYear}
                                onChange={handleInputChange}
                                min="1900"
                                max={new Date().getFullYear()}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-150 bg-gray-50 hover:bg-white"
                                placeholder="2024"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                <Image className="h-4 w-4 mr-2 text-pink-500" />
                                URL hình ảnh
                            </label>
                            <input
                                type="url"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-150 bg-gray-50 hover:bg-white"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                <FileText className="h-4 w-4 mr-2 text-teal-500" />
                                Mô tả
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-150 bg-gray-50 hover:bg-white resize-none"
                                placeholder="Nhập mô tả sách..."
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 text-gray-600 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-150 font-medium"
                        >
                            Hủy
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-150 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Đang xử lý...
                                </>
                            ) : (
                                <>
                                    <BookOpen className="h-4 w-4" />
                                    {isEdit ? 'Cập nhật' : 'Thêm mới'}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookFormPopup;