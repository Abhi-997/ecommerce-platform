import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, getProduct, checkout } from '../utils/api';
import { FiCreditCard, FiCheck } from 'react-icons/fi';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const userId = 1;
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await getCart(userId);
      const items = response.data.cart || [];
      setCartItems(items);

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    const required = ['name', 'email', 'address', 'city', 'zipCode', 'cardNumber', 'expiryDate', 'cvv'];
    for (let field of required) {
      if (!formData[field]) {
        alert(`Please fill in ${field}`);
        return;
      }
    }

    setProcessing(true);

    try {
      await checkout({
        userId,
        amount: getTotal(),
        paymentMethod: 'card'
      });

      setOrderCompleted(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment processing failed. Please try again.');
      setProcessing(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (cartItems.length === 0 && !orderCompleted) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  if (orderCompleted) {
    return (
      <div className="order-complete">
        <div className="success-icon">
          <FiCheck />
        </div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase. You will receive a confirmation email shortly.</p>
        <p className="redirect-text">Redirecting to home page...</p>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="container">
        <h1>Checkout</h1>
        <div className="checkout-content">
          <form onSubmit={handleSubmit} className="checkout-form card">
            <h2>Shipping Information</h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>ZIP Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <h2 style={{ marginTop: '40px' }}>Payment Information</h2>

            <div className="form-group">
              <label>Card Number *</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Expiry Date *</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  required
                />
              </div>

              <div className="form-group">
                <label>CVV *</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={processing}
            >
              {processing ? 'Processing...' : (
                <>
                  <FiCreditCard />
                  Complete Order
                </>
              )}
            </button>
          </form>

          <div className="order-summary">
            <div className="summary-card card">
              <h2>Order Summary</h2>
              <div className="order-items">
                {cartItems.map(item => {
                  const product = products[item.productId];
                  if (!product) return null;
                  return (
                    <div key={item.productId} className="order-item">
                      <img src={product.image} alt={product.name} />
                      <div className="order-item-info">
                        <h4>{product.name}</h4>
                        <span>Qty: {item.quantity}</span>
                      </div>
                      <span className="order-item-price">
                        ${(product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="summary-total">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
