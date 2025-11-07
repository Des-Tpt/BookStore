import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [
        {
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
                required: true
            },
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true }
        }
    ],

    totalAmount: { type: Number, required: true },

    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending"
    },

    paymentMethod: {
        type: String,
        enum: ["cash", "card", "banking", "momo", "zalopay"],
        required: true
    },

    // Thông tin giao hàng (nếu có)
    shippingAddress: {
        fullName: String,
        phone: String,
        address: String,
        city: String,
        country: String
    },

}, { timestamps: true });

const Invoice = mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);

export default Invoice;