# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm run install-all
```

### Step 2: Start the Development Server
```bash
npm run dev
```

### Step 3: Open Your Browser
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

That's it! You now have a fully functional e-commerce platform running.

## 📱 Features You Can Try

### 1. Browse Products
- Visit http://localhost:3000
- Browse through 6 sample products
- Filter by category (Electronics, Fashion, Accessories)

### 2. Add to Cart
- Click on any product to view details
- Click "Add to Cart" button
- View cart count in navigation

### 3. Rate and Review
- Go to any product detail page
- Scroll to "Customer Reviews" section
- Submit your rating and review
- See average ratings update in real-time

### 4. Checkout
- Go to cart page
- Click "Proceed to Checkout"
- Fill in shipping and payment information
- Complete the order
- See success confirmation

## 🎨 What You'll See

- **Modern UI**: Beautiful gradient colors and smooth animations
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Cart quantities and totals update instantly
- **Rating System**: 5-star ratings with customer reviews
- **Payment Processing**: Mock checkout with success confirmation

## 💡 Tips

- Use different user IDs to test multiple carts
- Products refresh on page reload
- Reviews are stored in memory (reset on server restart)
- Cart items persist during session

## 🔧 Troubleshooting

**Port already in use?**
- Change PORT in .env file to another port (e.g., 5001)
- Update API_URL in client/src/utils/api.js if needed

**Can't see products?**
- Make sure backend is running on port 5000
- Check browser console for errors
- Verify API endpoint is accessible

**Style issues?**
- Clear browser cache
- Restart development server
- Check CSS files are loaded

## 📝 Next Steps

1. Add your own products in `server/routes/products.js`
2. Customize colors in CSS files
3. Add database integration (MongoDB/PostgreSQL)
4. Integrate real Stripe payment gateway
5. Add user authentication

Enjoy your e-commerce platform! 🎉
