'use client'
import { User } from '@/type/User';
import { Edit, Search, Trash2, Users, Sparkles, TrendingUp, Mail, Phone, MapPin, Shield } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState, useMemo, memo } from 'react';
import UserFormPopup from './UserForm';
import UserDeletePopup from './UserDelete';

interface UsersPageProps {
    users: User[];
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
    onAddUser?: (userData: Partial<User>) => void;
    onEditUser?: (userData: Partial<User>) => void;
    onDeleteUser?: (userId: string) => void;
}

const getRoleBadgeColor = (role: string) => {
    if (!role) return 'bg-gray-100 text-gray-700 border-gray-300';

    switch (role.toLowerCase()) {
        case 'admin':
            return 'bg-purple-100 text-purple-700 border-purple-300';
        case 'user':
            return 'bg-blue-100 text-blue-700 border-blue-300';
        case 'moderator':
            return 'bg-green-100 text-green-700 border-green-300';
        default:
            return 'bg-gray-100 text-gray-700 border-gray-300';
    }
};


const UserRow = memo(({
    user,
    onEdit,
    onDelete
}: {
    user: User;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}) => (
    <tr className="border-b border-gray-100/50 hover:bg-blue-50/30 transition-colors duration-150 group">
        <td className="py-6 px-6">
            <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                    <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="space-y-1">
                    <p className="font-semibold text-gray-900">
                        {user.name}
                    </p>
                    <p className="text-sm text-gray-500">#{user._id.slice(-6)}</p>
                </div>
            </div>
        </td>
        <td className="py-6 px-6">
            <div className="flex items-center space-x-2 text-gray-700">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{user.email}</span>
            </div>
        </td>
        <td className="py-6 px-6">
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${getRoleBadgeColor(user.role)}`}>
                <Shield className="h-4 w-4 mr-1.5" />
                {user.role}
            </span>
        </td>
        <td className="py-6 px-6">
            <div className="space-y-2">
                {user.phone && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{user.phone}</span>
                    </div>
                )}
                {user.address && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="line-clamp-1">{user.address}</span>
                    </div>
                )}
                {!user.phone && !user.address && (
                    <span className="text-sm text-gray-400 italic">Chưa cập nhật</span>
                )}
            </div>
        </td>
        <td className="py-6 px-6">
            <div className="flex items-center justify-center space-x-2">
                <button
                    onClick={() => onEdit(user)}
                    className="p-2.5 text-green-600 hover:bg-green-100 rounded-xl transition-colors duration-150"
                    title="Chỉnh sửa"
                >
                    <Edit size={18} />
                </button>
                <button
                    onClick={() => onDelete(user)}
                    className="p-2.5 text-red-600 hover:bg-red-100 rounded-xl transition-colors duration-150"
                    title="Xóa người dùng"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </td>
    </tr>
));

const UsersPage = ({
    users,
    searchTerm,
    setSearchTerm,
    onAddUser,
    onEditUser,
    onDeleteUser
}: UsersPageProps) => {
    const [editUser, setEditUser] = useState<User | null>(null);
    const [deleteUser, setDeleteUser] = useState<User | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const filteredUsers = useMemo(() => {
        if (!searchTerm.trim()) return users;

        const searchLower = searchTerm.toLowerCase();
        return users.filter((user: User) =>
            user.name.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower) ||
            user.role.toLowerCase().includes(searchLower) ||
            user.phone?.toLowerCase().includes(searchLower) ||
            user.address?.toLowerCase().includes(searchLower)
        );
    }, [users, searchTerm]);

    const handleEditUser = (user: User) => {
        setEditUser(user);
    };

    const handleDeleteUser = (user: User) => {
        setDeleteUser(user);
    };

    const handleAddUser = (userData: Partial<User>) => {
        if (onAddUser) {
            onAddUser(userData);
        }
        setShowAddForm(false);
    };

    const handleUpdateUser = (userData: Partial<User>) => {
        if (onEditUser) {
            onEditUser(userData);
        }
        setEditUser(null);
    };

    const handleConfirmDelete = async () => {
        if (deleteUser && onDeleteUser) {
            setIsDeleting(true);
            try {
                await onDeleteUser(deleteUser._id);
                setDeleteUser(null);
            } catch (error) {
                console.error('Error deleting user:', error);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                                    <Users className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        Quản lý Người dùng
                                    </h1>
                                    <div className="flex items-center space-x-4 mt-1">
                                        <p className="text-gray-600 flex items-center">
                                            <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                                            Tổng cộng <span className="font-semibold text-blue-600 mx-1">{users.length}</span> người dùng
                                        </p>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Sparkles className="h-4 w-4 mr-1" />
                                            {filteredUsers.length} hiển thị
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-150 flex items-center gap-3 font-medium"
                        >
                            <Users size={20} />
                            <span>Thêm người dùng mới</span>
                        </button>
                    </div>
                </div>

                {/* Search Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, email, vai trò, số điện thoại hoặc địa chỉ..."
                            value={searchTerm}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 bg-white text-gray-700 placeholder-gray-500"
                        />
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-left py-6 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider">Tên người dùng</th>
                                    <th className="text-left py-6 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider">Email</th>
                                    <th className="text-left py-6 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider">Vai trò</th>
                                    <th className="text-left py-6 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider">Thông tin liên hệ</th>
                                    <th className="text-center py-6 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user: User) => (
                                    <UserRow
                                        key={user._id}
                                        user={user}
                                        onEdit={handleEditUser}
                                        onDelete={handleDeleteUser}
                                    />
                                ))}
                            </tbody>
                        </table>

                        {filteredUsers.length === 0 && (
                            <div className="text-center py-16">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                    <Users className="h-8 w-8 text-gray-400" />
                                </div>
                                <p className="text-gray-500 text-lg font-medium">Không tìm thấy người dùng nào</p>
                                <p className="text-gray-400 text-sm mt-1">Thử thay đổi từ khóa tìm kiếm</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <UserFormPopup
                isOpen={showAddForm}
                onClose={() => setShowAddForm(false)}
                onSubmit={handleAddUser}
                isEdit={false}
            />

            <UserFormPopup
                user={editUser}
                isOpen={!!editUser}
                onClose={() => setEditUser(null)}
                onSubmit={handleUpdateUser}
                isEdit={true}
            />

            <UserDeletePopup
                user={deleteUser}
                isOpen={!!deleteUser}
                onClose={() => setDeleteUser(null)}
                onConfirm={handleConfirmDelete}
                isDeleting={isDeleting}
            />

        </div>
    );
};

export default UsersPage;