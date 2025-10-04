import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    stock: { type: Number, default: 0 },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    publishedYear: { type: Number },
}, {
    timestamps: true
});

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

export default Book;