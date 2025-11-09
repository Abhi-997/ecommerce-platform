import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, addToCart, getReviews, addReview, getAverageRating } from '../utils/api';
import { FiStar, FiShoppingCart } from 'react-icons/fi';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(5);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetchProduct();
    fetchReviews();
    fetchAverageRating();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await getProduct(id);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await getReviews(id);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fetchAverageRating = async () => {
    try {
      const response = await getAverageRating(id);
      setAverageRating(parseFloat(response.data.averageRating));
      setReviewCount(response.data.totalReviews);
    } catch (error) {
      console.error('Error fetching average rating:', error);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart({ userId: 1, productId: parseInt(id), quantity: 1 });
      alert('Product added to cart!');
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!userName.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!comment.trim()) {
      alert('Please enter a review');
      return;
    }

    try {
      await addReview({
        productId: id,
        userId: Date.now(),
        userName,
        rating: userRating,
        comment
      });
      setComment('');
      setUserName('');
      fetchReviews();
      fetchAverageRating();
      alert('Review added successfully!');
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Failed to add review');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="not-found">Product not found</div>;
  }

  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-detail-content">
          <div className="product-image-section">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-info-section">
            <h1>{product.name}</h1>
            <p className="product-category">Category: {product.category}</p>
            
            <div className="rating-summary">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={i < Math.round(averageRating) ? 'star-filled' : 'star-empty'}
                  />
                ))}
              </div>
              <span className="rating-text">
                {averageRating.toFixed(1)} ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
              </span>
            </div>

            <p className="product-price">${product.price.toFixed(2)}</p>
            <p className="product-description">{product.description}</p>
            <p className="stock-status">{product.inStock ? '✅ In Stock' : '❌ Out of Stock'}</p>

            <button
              onClick={handleAddToCart}
              className="btn btn-primary"
              disabled={!product.inStock}
            >
              <FiShoppingCart />
              Add to Cart
            </button>
          </div>
        </div>

        <div className="reviews-section">
          <h2>Customer Reviews</h2>

          <form onSubmit={handleSubmitReview} className="review-form">
            <h3>Write a Review</h3>
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            
            <div className="form-group">
              <label>Rating</label>
              <div className="rating-input">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`star ${i < userRating ? 'active' : ''}`}
                    onClick={() => setUserRating(i + 1)}
                  />
                ))}
                <span>{userRating}/5</span>
              </div>
            </div>

            <div className="form-group">
              <label>Your Review</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here..."
                rows="4"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>
          </form>

          <div className="reviews-list">
            {reviews.length === 0 ? (
              <p className="no-reviews">No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map(review => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <strong>{review.userName}</strong>
                    <div className="review-stars">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={i < review.rating ? 'star-filled-small' : 'star-empty-small'}
                        />
                      ))}
                    </div>
                    <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
