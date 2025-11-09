const express = require('express');
const router = express.Router();

// Sample products database - Jerseys and Boots
const products = [
  {
    id: 1,
    name: 'Barcelona Home Jersey 2024',
    price: 89.99,
    description: 'Official Barcelona home jersey with authentic design and breathable fabric',
    image: '/images/barcelona-jersey.jpg',
    category: 'Jerseys',
    inStock: true
  },
  {
    id: 2,
    name: 'Real Madrid Away Jersey',
    price: 85.99,
    description: 'Classic Real Madrid away jersey, comfortable fit for match day',
    image: '/images/realmadrid-jersey.jpg',
    category: 'Jerseys',
    inStock: true
  },
  {
    id: 3,
    name: 'Manchester United Home Kit',
    price: 92.99,
    description: 'Official Manchester United home kit with player name printing option',
    image: '/images/manutd-jersey.jpg', // Add your image file here: save as manutd-jersey.jpg in client/public/images/
    category: 'Jerseys',
    inStock: true
  },
  {
    id: 4,
    name: 'Nike Mercurial Vapor Boots',
    price: 149.99,
    description: 'Lightweight football boots with superior grip and speed',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
    category: 'Boots',
    inStock: true
  },
  {
    id: 5,
    name: 'Adidas Predator Boots',
    price: 159.99,
    description: 'Premium football boots with enhanced ball control technology',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
    category: 'Boots',
    inStock: true
  },
  {
    id: 6,
    name: 'Puma Future Boots',
    price: 139.99,
    description: 'Modern football boots designed for agility and comfort',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop',
    category: 'Boots',
    inStock: true
  },
  {
    id: 7,
    name: 'Liverpool Home Jersey',
    price: 88.99,
    description: 'Official Liverpool FC home jersey, perfect for Anfield',
    image: '/images/liverpool-jersey.jpg', // Replace with your image filename
    category: 'Jerseys',
    inStock: true
  },
  {
    id: 8,
    name: 'Nike Tiempo Boots',
    price: 134.99,
    description: 'Classic leather football boots with traditional feel',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop',
    category: 'Boots',
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
