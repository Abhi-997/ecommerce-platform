const express = require('express');
const router = express.Router();

// In-memory reviews storage (in production, use a database)
const reviews = {};

// Get reviews for a product
router.get('/:productId', (req, res) => {
  const productReviews = reviews[req.params.productId] || [];
  res.json(productReviews);
});

// Add review
router.post('/', (req, res) => {
  const { productId, userId, userName, rating, comment } = req.body;
  
  if (!reviews[productId]) {
    reviews[productId] = [];
  }
  
  const review = {
    id: Date.now(),
    productId,
    userId,
    userName: userName || 'Anonymous',
    rating,
    comment,
    date: new Date().toISOString()
  };
  
  reviews[productId].push(review);
  
  res.json(review);
});

// Calculate average rating
router.get('/:productId/average', (req, res) => {
  const productReviews = reviews[req.params.productId] || [];
  
  if (productReviews.length === 0) {
    return res.json({ averageRating: 0, totalReviews: 0 });
  }
  
  const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / productReviews.length;
  
  res.json({
    averageRating: averageRating.toFixed(1),
    totalReviews: productReviews.length
  });
});

module.exports = router;
