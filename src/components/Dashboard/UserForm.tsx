'use client'
import { User } from '@/type/User';
import { X, Users, Mail, Lock, Shield, Phone, MapPin } from 'lucide-react';
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-transform duration-200 ease-out">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Users className="h-6 w-6 text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-white">
                                {isEdit ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
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
                            {/* Tên người dùng */}
                            <div>
                                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                    <Users className="h-4 w-4 mr-2 text-blue-500" />
                                    Tên người dùng <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200"
                                    placeholder="Nhập tên người dùng..."
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                    <Mail className="h-4 w-4 mr-2 text-green-500" />
                                    Email <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-200"
                                    placeholder="Nhập email..."
                                />
                            </div>

                            {/* Mật khẩu */}
                            <div>
                                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                    <Lock className="h-4 w-4 mr-2 text-red-500" />
                                    Mật khẩu {!isEdit && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required={!isEdit}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors duration-200"
                                    placeholder={isEdit ? "Để trống nếu không đổi mật khẩu..." : "Nhập mật khẩu..."}
                                />
                                {isEdit && (
                                    <p className="text-xs text-gray-500 mt-2">
                                        * Để trống nếu không muốn thay đổi mật khẩu
                                    </p>
                                )}
                            </div>

                            {/* Vai trò */}
                            <div>
                                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                    <Shield className="h-4 w-4 mr-2 text-purple-500" />
                                    Vai trò <span className="text-red-500 ml-1">*</span>
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            {/* Số điện thoại */}
                            <div>
                                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                    <Phone className="h-4 w-4 mr-2 text-teal-500" />
                                    Số điện thoại
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors duration-200"
                                    placeholder="Nhập số điện thoại..."
                                />
                            </div>

                            {/* Địa chỉ */}
                            <div>
                                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                    <MapPin className="h-4 w-4 mr-2 text-orange-500" />
                                    Địa chỉ
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors duration-200 resize-none"
                                    placeholder="Nhập địa chỉ..."
                                />
                            </div>

                            {/* Ghi chú */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-start space-x-2">
                                    <Users className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <div className="text-sm text-blue-800">
                                        <p className="font-medium mb-1">Lưu ý:</p>
                                        <ul className="text-blue-700 space-y-1 list-disc list-inside">
                                            <li>Các trường có dấu (*) là bắt buộc</li>
                                            <li>Email phải là duy nhất trong hệ thống</li>
                                            <li>Mật khẩu nên có ít nhất 6 ký tự</li>
                                        </ul>
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
                                        <Users className="h-4 w-4" />
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

export default UserFormPopup;