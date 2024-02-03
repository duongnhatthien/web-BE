const mongoose = require('mongoose');
const ImageSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true,
    },
});

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        images: [ImageSchema],
        type: { type: String, required: true },
        rating: { type: Number, required: true },
        description: { type: String, required: true },
        countInStock: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Products', ProductSchema);
module.exports = Product;
