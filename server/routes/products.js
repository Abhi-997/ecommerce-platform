const express = require('express');
const router = express.Router();

// Sample products database
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    description: 'High-quality wireless headphones with noise cancellation',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    category: 'Electronics',
    inStock: true
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 249.99,
    description: 'Feature-rich smartwatch with health tracking',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    category: 'Electronics',
    inStock: true
  },
  {
    id: 3,
    name: 'Running Shoes',
    price: 129.99,
    description: 'Comfortable running shoes with advanced cushioning',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    category: 'Fashion',
    inStock: true
  },
  {
    id: 4,
    name: 'Leather Jacket',
    price: 299.99,
    description: 'Genuine leather jacket with premium quality',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
    category: 'Fashion',
    inStock: true
  },
  {
    id: 5,
    name: 'Laptop Backpack',
    price: 79.99,
    description: 'Durable backpack designed for laptops and tech gear',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
    category: 'Accessories',
    inStock: true
  },
  {
    id: 6,
    name: 'Gaming Mouse',
    price: 59.99,
    description: 'Precision gaming mouse with RGB lighting',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800',
    category: 'Electronics',
    inStock: true
  }
];

// Get all products
router.get('/', (req, res) => {
  const { category } = req.query;
  if (category) {
    const filtered = products.filter(p => p.category === category);
    return res.json(filtered);
  }
  res.json(products);
});

// Get single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

module.exports = router;
