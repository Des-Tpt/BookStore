import { User } from "@/type/User";
import toast from "react-hot-toast";

export const fetchUser = async (): Promise<User[]> => {
    try {
        const response = await fetch('/api/users', {
            method: 'GET',
        });

        const result = await response.json();

        if (Array.isArray(result)) {
            return result;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};

export const addUser = async (userData: Partial<User>): Promise<boolean> => {
    try {
        const formData = new FormData();

        if (userData.name) formData.append('name', userData.name);
        if (userData.email) formData.append('email', userData.email);
        if (userData.password) formData.append('password', userData.password);
        if (userData.role) formData.append('role', userData.role);
        if (userData.address) formData.append('address', userData.address);
        if (userData.phone) formData.append('phone', userData.phone);

        const response = await fetch('/api/users/add', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            toast.success('Thêm người dùng thành công!');
            return true;
        } else {
            toast.error(result.error || 'Có lỗi xảy ra khi thêm người dùng!');
            return false;
        }
    } catch (error) {
        console.error('Error adding user:', error);
        toast.error('Có lỗi xảy ra khi thêm người dùng!');
        return false;
    }
};

export const editUser = async (userData: Partial<User>): Promise<boolean> => {
    try {
        if (!userData._id) {
            toast.error('ID sách không hợp lệ!');
            return false;
        }

        const formData = new FormData();

        if (userData.name) formData.append('name', userData.name);
        if (userData.email) formData.append('email', userData.email);
        if (userData.password) formData.append('password', userData.password);
        if (userData.role) formData.append('role', userData.role);
        if (userData.address) formData.append('address', userData.address);
        if (userData.phone) formData.append('phone', userData.phone);

        const response = await fetch(`/api/users/${userData._id}`, {
            method: 'PATCH',
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            toast.success('Cập nhật người dùng thành công!');
            return true;
        } else {
            toast.error(result.error || 'Có lỗi xảy ra khi cập nhật người dùng!');
            return false;
        }
    } catch (error) {
        console.error('Error editing user:', error);
        toast.error('Có lỗi xảy ra khi cập nhật người dùng!');
        return false;
    }
};


export const deleteUser = async (userId: string): Promise<boolean> => {
    try {
        if (!userId) {
            toast.error('ID sách không hợp lệ!');
            return false;
        }

        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE',
        });

        const result = await response.json();

        if (result.success) {
            toast.success('Xóa người dùng thành công!');
            return true;
        } else {
            toast.error(result.error || 'Có lỗi xảy ra khi xóa người dùng!');
            return false;
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Có lỗi xảy ra khi xóa người dùng!');
        return false;
    }
};