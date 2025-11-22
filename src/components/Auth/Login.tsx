'use client'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: boolean) => {
        if (type) {
            setEmail(e.currentTarget.value);
        } else {
            setPassword(e.currentTarget.value);
        }
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: email,
                password: password,
            });

            if (result?.error) {
                if (result.error === 'EmailNotFound') {
                    setError('Email không tồn tại trong hệ thống');
                } else if (result.error === 'InvalidPassword') {
                    setError('Mật khẩu không chính xác');
                } else {
                    setError('Email hoặc mật khẩu không chính xác');
                }
                toast.error('Đăng nhập thất bại');
            } else {
                toast.success('Đăng nhập thành công!');
                router.push('/dashboard');
                router.refresh();
            }
        } catch (error) {
            setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
            toast.error('Có lỗi xảy ra');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all duration-200 ease-out">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-8">
                    <div className="text-center">
                        <div className="inline-flex p-3 bg-white/20 rounded-full mb-4">
                            <LogIn className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">
                            Chào mừng trở lại
                        </h1>
                        <p className="text-blue-100 text-sm">
                            Đăng nhập để tiếp tục
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex items-start space-x-2">
                                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                            <Mail className="h-4 w-4 mr-2 text-blue-500" />
                            Email <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => handleInputChange(e, true)}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                            <Lock className="h-4 w-4 mr-2 text-purple-500" />
                            Mật khẩu <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={(e) => handleInputChange(e, false)}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 pr-12"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-gray-600">Ghi nhớ đăng nhập</span>
                        </label>
                        <a href="/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
                            Quên mật khẩu?
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-colors duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Đang đăng nhập...
                            </>
                        ) : (
                            <>
                                <LogIn className="h-5 w-5" />
                                Đăng nhập
                            </>
                        )}
                    </button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">hoặc</span>
                        </div>
                    </div>

                    <div className="text-center text-sm text-gray-600">
                        Chưa có tài khoản?{' '}
                        <a href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                            Đăng ký ngay
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;