/**
 * Seed script – populates DB with sample products
 * Usage: node seeder.js          (import)
 *        node seeder.js -d       (destroy)
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const Product = require('./models/productModel');
const User = require('./models/userModel');

const sampleProducts = [
    {
        name: 'Apple AirPods Pro',
        description: 'Active Noise Cancelling wireless earbuds with Transparency mode.',
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1606741965440-7e1a8e91bda9?w=400',
        category: 'Electronics',
        brand: 'Apple',
        countInStock: 25,
        rating: 4.8,
        numReviews: 12,
    },
    {
        name: 'Sony WH-1000XM5',
        description: 'Industry-leading noise cancelling headphones with 30-hour battery life.',
        price: 349.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        category: 'Electronics',
        brand: 'Sony',
        countInStock: 15,
        rating: 4.9,
        numReviews: 8,
    },
    {
        name: 'Nike Air Max 270',
        description: 'Lifestyle sneaker with the tallest Air unit yet for a super-soft ride.',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        category: 'Footwear',
        brand: 'Nike',
        countInStock: 50,
        rating: 4.5,
        numReviews: 20,
    },
    {
        name: 'Mechanical Keyboard – Keychron K2',
        description: 'Wireless mechanical keyboard with RGB backlight and hot-swappable switches.',
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
        category: 'Electronics',
        brand: 'Keychron',
        countInStock: 30,
        rating: 4.7,
        numReviews: 15,
    },
    {
        name: 'Logitech MX Master 3',
        description: 'Advanced wireless mouse with MagSpeed scrolling and ergonomic design.',
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
        category: 'Electronics',
        brand: 'Logitech',
        countInStock: 40,
        rating: 4.8,
        numReviews: 18,
    },
    {
        name: 'Minimalist Leather Watch',
        description: 'Classic minimalist watch with genuine leather band and scratch-resistant glass.',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        category: 'Accessories',
        brand: 'Timex',
        countInStock: 20,
        rating: 4.3,
        numReviews: 10,
    },
    {
        name: 'Samsung 27" 4K Monitor',
        description: 'Ultra-HD IPS display with HDR10, 60Hz and USB-C connectivity.',
        price: 399.99,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400',
        category: 'Electronics',
        brand: 'Samsung',
        countInStock: 10,
        rating: 4.6,
        numReviews: 7,
    },
    {
        name: 'Adidas Ultraboost 22',
        description: 'High-performance running shoe with responsive Boost midsole.',
        price: 179.99,
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400',
        category: 'Footwear',
        brand: 'Adidas',
        countInStock: 35,
        rating: 4.7,
        numReviews: 14,
    },
];

const sampleUsers = [
    {
        name: 'Admin User',
        email: 'admin@shopez.com',
        password: 'admin123',
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@shopez.com',
        password: 'john1234',
        isAdmin: false,
    },
];

const importData = async () => {
    await connectDB();
    await User.deleteMany();
    await Product.deleteMany();
    await User.create(sampleUsers);       // passwords are hashed by pre-save hook
    await Product.insertMany(sampleProducts);
    console.log('✅ Users + Products seeded!');
    console.log('👑 Admin  →  admin@shopez.com  /  admin123');
    console.log('👤 User   →  john@shopez.com   /  john1234');
    process.exit();
};


const destroyData = async () => {
    await connectDB();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('🗑️  Data destroyed!');
    process.exit();
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
