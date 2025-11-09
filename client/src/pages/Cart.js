import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getCart, updateCartItem, removeFromCart, getProduct } from '../utils/api';
import { FiPlus, FiMinus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const userId = 1;
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await getCart(userId);
      const items = response.data.cart || [];
      setCartItems(items);

      // Fetch product details for each cart item
      const productPromises = items.map(item => getProduct(item.productId));
      const productResponses = await Promise.all(productPromises);
      const productsMap = {};
      productResponses.forEach((response, index) => {
        productsMap[items[index].productId] = response.data;
      });
      setProducts(productsMap);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await updateCartItem({ userId, productId, quantity: newQuantity });
      fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart({ userId, productId });
      fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => {
      const product = products[item.productId];
      if (product) {
        return sum + product.price * item.quantity;
      }
      return sum;
    }, 0);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <FiShoppingBag size={80} />
        <h2>Your cart is empty</h2>
        <p>Add some products to get started</p>
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="container">
        <h1>Shopping Cart</h1>
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => {
              const product = products[item.productId];
              if (!product) return null;

              return (
                <div key={item.productId} className="cart-item card">
                  <Link to={`/product/${item.productId}`} className="cart-item-image">
                    <img src={product.image} alt={product.name} />
                  </Link>
                  <div className="cart-item-info">
                    <h3>{product.name}</h3>
                    <p className="cart-item-category">{product.category}</p>
                    <p className="cart-item-price">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        <FiMinus />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      className="remove-btn"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                  <div className="cart-item-total">
                    ${(product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <div className="summary-card card">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="btn btn-primary checkout-btn"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
