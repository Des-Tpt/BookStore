'use client'
import { User } from '@/type/User';
import { X, Users, Mail, Lock, Shield, Phone, MapPin, AlertCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface UserFormPopupProps {
    user?: User | null;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (userData: Partial<User>) => void;
    isEdit?: boolean;
}

const UserFormPopup = ({ user, isOpen, onClose, onSubmit, isEdit = false }: UserFormPopupProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
        address: '',
        phone: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isEdit && user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                password: '',
                role: user.role || 'user',
                address: user.address || '',
                phone: user.phone || ''
            });
        } else {
            setFormData({
                name: '',
                email: '',
                password: '',
                role: 'user',
                address: '',
                phone: ''
            });
        }
    }, [user, isEdit, isOpen]);

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

        const submitData: Partial<User> = {
            name: formData.name,
            email: formData.email,
            role: formData.role,
            address: formData.address,
            phone: formData.phone
        };

        if (formData.password) {
            submitData.password = formData.password;
        }

        if (isEdit && user) {
            submitData._id = user._id;
        }

        onSubmit(submitData);
        setIsSubmitting(false);
    };

    if (!isOpen) return null;

    return (
        <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ease-out animate-in fade-in-0 scale-in-95"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">
                            {isEdit ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 group"
                    >
                        <X size={24} className="text-white group-hover:rotate-90 transition-transform duration-200" />
                    </button>
                </div>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    {/* Grid 2 cột */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Tên người dùng */}
                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <Users className="h-4 w-4 mr-2 text-blue-500" />
                                Tên <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-sm"
                                placeholder="Tên người dùng..."
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <Mail className="h-4 w-4 mr-2 text-green-500" />
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors duration-200 text-sm"
                                placeholder="email@example.com"
                            />
                        </div>

                        {/* Mật khẩu */}
                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <Lock className="h-4 w-4 mr-2 text-red-500" />
                                Mật khẩu {!isEdit && <span className="text-red-500">*</span>}
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required={!isEdit}
                                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors duration-200 text-sm"
                                placeholder={isEdit ? "Để trống nếu không đổi..." : "Mật khẩu..."}
                            />
                        </div>

                        {/* Vai trò */}
                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <Shield className="h-4 w-4 mr-2 text-purple-500" />
                                Vai trò <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white text-sm"
                            >
                                <option value="user">👤 User</option>
                                <option value="admin">🔐 Admin</option>
                            </select>
                        </div>

                        {/* Số điện thoại */}
                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <Phone className="h-4 w-4 mr-2 text-teal-500" />
                                Số điện thoại
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors duration-200 text-sm"
                                placeholder="0912345678"
                            />
                        </div>
                    </div>

                    {/* Địa chỉ - Full width */}
                    <div>
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                            <MapPin className="h-4 w-4 mr-2 text-orange-500" />
                            Địa chỉ
                        </label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            rows={2}
                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-200 resize-none text-sm"
                            placeholder="Nhập địa chỉ..."
                        />
                    </div>

                    {/* Ghi chú */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-blue-800">
                                <p className="font-semibold mb-2">📌 Lưu ý:</p>
                                <ul className="space-y-1 text-blue-700">
                                    <li>• Các trường có dấu (*) là bắt buộc</li>
                                    <li>• Email phải duy nhất trong hệ thống</li>
                                    <li>• Mật khẩu tối thiểu 6 ký tự</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 text-gray-600 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium text-sm"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Đang xử lý...
                                </>
                            ) : (
                                <>
                                    {isEdit ? '✏️ Cập nhật' : '✨ Thêm mới'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserFormPopup;