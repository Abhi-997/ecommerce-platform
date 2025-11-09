const express = require('express');
const router = express.Router();

// In-memory cart storage (in production, use a database)
const carts = {};

// Get or create cart
router.post('/', (req, res) => {
  const { userId, productId, quantity = 1 } = req.body;
  
  if (!carts[userId]) {
    carts[userId] = [];
  }
  
  const existingItem = carts[userId].find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    carts[userId].push({ productId, quantity });
  }
  
  res.json({ cart: carts[userId] });
});

// Get cart
router.get('/:userId', (req, res) => {
  res.json({ cart: carts[req.params.userId] || [] });
});

// Update cart item
router.put('/', (req, res) => {
  const { userId, productId, quantity } = req.body;
  
  if (!carts[userId]) {
    return res.status(404).json({ error: 'Cart not found' });
  }
  
  const item = carts[userId].find(item => item.productId === productId);
  if (item) {
    item.quantity = quantity;
  }
  
  res.json({ cart: carts[userId] });
});

// Remove from cart
router.delete('/', (req, res) => {
  const { userId, productId } = req.body;
  
  if (!carts[userId]) {
    return res.status(404).json({ error: 'Cart not found' });
  }
  
  carts[userId] = carts[userId].filter(item => item.productId !== productId);
  
  res.json({ cart: carts[userId] });
});

module.exports = router;
