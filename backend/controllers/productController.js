const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

// @desc    Get all products with pagination + search
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = Number(req.query.pageSize) || 8;
    const page = Number(req.query.page) || 1;
    const keyword = req.query.keyword
        ? { name: { $regex: req.query.keyword, $options: 'i' } }
        : {};
    const category = req.query.category ? { category: req.query.category } : {};

    const filter = { ...keyword, ...category };
    const count = await Product.countDocuments(filter);
    const products = await Product.find(filter)
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize), total: count });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create product (Admin)
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = new Product({
        name,
        price,
        description,
        image: image || '/images/sample.jpg',
        brand,
        category,
        countInStock,
    });
    const created = await product.save();
    res.status(201).json(created);
});

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = name ?? product.name;
        product.price = price ?? product.price;
        product.description = description ?? product.description;
        product.image = image ?? product.image;
        product.brand = brand ?? product.brand;
        product.category = category ?? product.category;
        product.countInStock = countInStock ?? product.countInStock;
        const updated = await product.save();
        res.json(updated);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create product review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );
        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }
        const review = { user: req.user._id, name: req.user.name, rating: Number(rating), comment };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;
        await product.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
});

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview, getTopProducts };
