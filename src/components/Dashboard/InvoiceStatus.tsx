'use client'
import { Invoice } from '@/type/Invoice';
import { X, CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';


interface InvoiceStatusPopupProps {
    invoice: Invoice | null;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (status: string) => void;
}

const InvoiceStatusPopup = ({
    invoice,
    isOpen,
    onClose,
    onUpdate
}: InvoiceStatusPopupProps) => {
    const [selectedStatus, setSelectedStatus] = useState<string>(invoice?.paymentStatus || 'pending');
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (invoice) {
            setSelectedStatus(invoice.paymentStatus);
        }
    }, [invoice]);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyPress);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !invoice) return null;

    const handleConfirm = async () => {
        setIsUpdating(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            onUpdate(selectedStatus);
        } finally {
            setIsUpdating(false);
        }
    };

    const statusOptions = [
        { value: 'pending', label: 'Chờ thanh toán', icon: Clock, borderColor: 'border-yellow-500', bgGradient: 'from-yellow-600 to-amber-600' },
        { value: 'paid', label: 'Đã thanh toán', icon: CheckCircle, borderColor: 'border-green-500', bgGradient: 'from-green-600 to-emerald-600' },
        { value: 'failed', label: 'Thanh toán thất bại', icon: AlertCircle, borderColor: 'border-red-500', bgGradient: 'from-red-600 to-rose-600' }
    ];

    return (
        <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-300 ease-out animate-in fade-in-0 scale-in-95 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                            <CreditCard className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Cập nhật trạng thái</h2>
                            <p className="text-white/80 text-sm">#{invoice._id?.slice(-8).toUpperCase()}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200"
                    >
                        <X size={20} className="text-white" />
                    </button>
                </div>
            </div>

            <div className="p-8 space-y-6">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">Khách hàng:</span> {invoice.userId.name}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                        <span className="font-semibold">Trạng thái hiện tại:</span>
                        <span className="ml-2 font-medium">
                            {statusOptions.find(s => s.value === invoice.paymentStatus)?.label}
                        </span>
                    </p>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        Chọn trạng thái mới
                    </label>
                    <div className="space-y-3">
                        {statusOptions.map((option) => {
                            const Icon = option.icon;
                            const isSelected = selectedStatus === option.value;
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => setSelectedStatus(option.value)}
                                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center space-x-3 ${isSelected
                                        ? `${option.borderColor} bg-gradient-to-r ${option.bgGradient} text-white shadow-lg scale-105`
                                        : 'border-gray-200 hover:border-gray-300 bg-gray-50 text-gray-800'
                                        }`}
                                >
                                    <Icon className="h-5 w-5 flex-shrink-0" />
                                    <span className="font-medium">{option.label}</span>
                                    {isSelected && (
                                        <div className="ml-auto">
                                            <CheckCircle className="h-5 w-5" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <p className="text-xs text-amber-800">
                        ⚠️ <span className="font-semibold">Lưu ý:</span> Thay đổi trạng thái sẽ gửi thông báo cho khách hàng
                    </p>
                </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 p-6 flex gap-3">
                <button
                    onClick={onClose}
                    className="flex-1 px-4 py-3 text-gray-700 border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-all duration-200 font-medium"
                    disabled={isUpdating}
                >
                    Hủy
                </button>
                <button
                    onClick={handleConfirm}
                    disabled={isUpdating || selectedStatus === invoice.paymentStatus}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isUpdating ? 'Đang cập nhật...' : 'Cập nhật'}
                </button>
            </div>
        </div>
    );
};

export default InvoiceStatusPopup;