'use client'
import { Category } from '@/type/Categories';
import { X, FolderOpen, FileText, Tag } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface CategoryFormPopupProps {
    category?: Category | null;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (categoryData: Partial<Category>) => void;
    isEdit?: boolean;
}

const CategoryFormPopup = ({ category, isOpen, onClose, onSubmit, isEdit = false }: CategoryFormPopupProps) => {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isEdit && category) {
            setFormData({
                name: category.name || '',
                description: category.description || ''
            });
        } else {
            setFormData({
                name: '',
                description: ''
            });
        }
    }, [category, isEdit, isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData: Partial<Category> = {
            name: formData.name,
            description: formData.description
        };

        if (isEdit && category) {
            submitData._id = category._id;
        }

        onSubmit(submitData);
        setIsSubmitting(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-transform duration-200 ease-out">
                {/* Header - Simplified gradient */}
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <FolderOpen className="h-6 w-6 text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-white">
                                {isEdit ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                        >
                            <X size={20} className="text-white" />
                        </button>
                    </div>
                </div>

                <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="space-y-6">
                            <div>
                                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                    <Tag className="h-4 w-4 mr-2 text-blue-500" />
                                    Tên danh mục <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200"
                                    placeholder="Nhập tên danh mục..."
                                />
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                    <FileText className="h-4 w-4 mr-2 text-teal-500" />
                                    Mô tả <span className="text-red-500 ml-1">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors duration-200 resize-none"
                                    placeholder="Nhập mô tả cho danh mục..."
                                />
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-start space-x-2">
                                    <FolderOpen className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <div className="text-sm text-blue-800">
                                        <p className="font-medium mb-1">Lưu ý:</p>
                                        <p className="text-blue-700">Slug sẽ được tự động tạo từ tên danh mục để sử dụng trong URL.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 text-gray-600 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-colors duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Đang xử lý...
                                    </>
                                ) : (
                                    <>
                                        <FolderOpen className="h-4 w-4" />
                                        {isEdit ? 'Cập nhật' : 'Thêm mới'}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoryFormPopup;