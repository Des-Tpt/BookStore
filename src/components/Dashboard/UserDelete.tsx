'use client'
import { User } from '@/type/User';
import { AlertTriangle, X, Users, Mail, Shield } from 'lucide-react';
import React from 'react';

interface UserDeletePopupProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isDeleting: boolean;
}

const UserDeletePopup = ({ user, isOpen, onClose, onConfirm, isDeleting }: UserDeletePopupProps) => {
    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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
                    {/* User Info Card */}
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 space-y-3">
                        <p className="text-gray-700 text-center">
                            Bạn có chắc chắn muốn xóa người dùng
                        </p>

                        <div className="bg-white rounded-xl p-4 space-y-2">
                            <div className="flex items-center justify-center space-x-2">
                                <Users className="h-5 w-5 text-blue-600" />
                                <p className="text-lg font-bold text-red-600">
                                    {user.name}
                                </p>
                            </div>

                            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                                <Mail className="h-4 w-4" />
                                <span>{user.email}</span>
                            </div>

                            <div className="flex items-center justify-center space-x-2">
                                <Shield className="h-4 w-4 text-purple-600" />
                                <span className="text-sm font-medium text-purple-600">
                                    {user.role}
                                </span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 text-center font-medium">
                            Hành động này không thể hoàn tác!
                        </p>
                    </div>

                    {/* Warning Note */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <div className="flex items-start space-x-2">
                            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-yellow-800 space-y-1">
                                <p className="font-medium">Lưu ý quan trọng:</p>
                                <ul className="list-disc list-inside space-y-1 text-yellow-700">
                                    <li>Tất cả dữ liệu liên quan sẽ bị xóa</li>
                                    <li>Các đơn hàng, bình luận của người dùng có thể bị ảnh hưởng</li>
                                    <li>Không thể khôi phục sau khi xóa</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onConfirm}
                            disabled={isDeleting}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                        >
                            {isDeleting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Đang xóa...
                                </>
                            ) : (
                                <>
                                    <AlertTriangle className="h-4 w-4" />
                                    Xóa người dùng
                                </>
                            )}
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
        </div>
    );
};

export default UserDeletePopup;