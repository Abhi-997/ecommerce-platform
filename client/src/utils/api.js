import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);
export const getCart = (userId) => api.get(`/cart/${userId}`);
export const addToCart = (data) => api.post('/cart', data);
export const updateCartItem = (data) => api.put('/cart', data);
export const removeFromCart = (data) => api.delete('/cart', { data });
export const checkout = (data) => api.post('/checkout', data);
export const getReviews = (productId) => api.get(`/reviews/${productId}`);
export const addReview = (data) => api.post('/reviews', data);
export const getAverageRating = (productId) => api.get(`/reviews/${productId}/average`);

export default api;
