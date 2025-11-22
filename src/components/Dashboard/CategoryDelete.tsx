'use client'
import { Category } from '@/type/Categories';
import { AlertTriangle, X } from 'lucide-react';
import React from 'react';

interface CategoryDeletePopupProps {
    category: Category | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isDeleting: boolean;
}

const CategoryDeletePopup = ({ category, isOpen, onClose, onConfirm, isDeleting }: CategoryDeletePopupProps) => {
    if (!isOpen || !category) return null;

    return (
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-t-3xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-white/20 rounded-xl">
                        <AlertTriangle className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Xác nhận xóa</h2>
                </div>
                <button
                    onClick={onClose}
                    disabled={isDeleting}
                    className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <X className="h-6 w-6 text-white" />
                </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                    <p className="text-gray-700 text-center">
                        Bạn có chắc chắn muốn xóa danh mục
                    </p>
                    <p className="text-lg font-bold text-red-600 text-center mt-2">
                        "{category.name}"
                    </p>
                    <p className="text-sm text-gray-600 text-center mt-3">
                        Hành động này không thể hoàn tác!
                    </p>
                </div>

                {/* Warning Note */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-yellow-800">
                            Lưu ý: Các sách thuộc danh mục này có thể bị ảnh hưởng sau khi xóa.
                        </p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isDeleting ? 'Đang xóa...' : 'Xóa danh mục'}
                    </button>
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Hủy bỏ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryDeletePopup;