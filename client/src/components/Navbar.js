import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Fetch cart count (using userId = 1 as default)
    fetch('http://localhost:5001/api/cart/1')
      .then(res => res.json())
      .then(data => {
        const count = data.cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;
        setCartCount(count);
      })
      .catch(err => console.error('Error fetching cart:', err));
  });

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <span className="logo-icon">��️</span>
          <span className="logo-text">E-Shop</span>
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="cart-link">
            <FiShoppingCart className="cart-icon" />
            Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <div className="user-actions">
            <FiUser />
            <span>Guest</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
