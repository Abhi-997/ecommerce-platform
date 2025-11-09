# FootGear - Football Jersey & Boots Store

A simple e-commerce website for buying football jerseys and boots with payment gateway integration, user ratings & reviews, and shopping cart functionality.

## Features

✨ **Core Features:**
- 🛍️ **Product Catalog** - Browse products with categories and detailed views
- 🛒 **Shopping Cart** - Add, update, and remove items with real-time calculations
- ⭐ **User Ratings & Reviews** - Rate products and read customer reviews
- 💳 **Payment Gateway** - Secure checkout process (integrated with Stripe)
- 📱 **Responsive Design** - Beautiful, modern UI that works on all devices

## Technology Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Icons** - Beautiful icon set
- **CSS3** - Modern styling with gradients and animations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Stripe** - Payment processing (ready for integration)
- **JWT** - Authentication support (ready for integration)

## Project Structure

```
ecommerce-platform/
├── server/
│   ├── routes/
│   │   ├── products.js      # Product catalog endpoints
│   │   ├── cart.js          # Shopping cart endpoints
│   │   ├── checkout.js      # Payment processing
│   │   └── reviews.js       # Ratings and reviews
│   └── index.js             # Express server setup
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js    # Navigation component
│   │   │   └── Navbar.css
│   │   ├── pages/
│   │   │   ├── Home.js      # Product listing page
│   │   │   ├── ProductDetail.js  # Product details with reviews
│   │   │   ├── Cart.js      # Shopping cart page
│   │   │   ├── Checkout.js  # Checkout and payment
│   │   │   └── *.css        # Page-specific styles
│   │   ├── utils/
│   │   │   └── api.js       # API helper functions
│   │   ├── App.js           # Main app component
│   │   ├── App.css          # Global styles
│   │   ├── index.js         # App entry point
│   │   └── index.css        # Base styles
│   └── public/
│       └── index.html       # HTML template
├── package.json             # Root package.json
└── README.md                # This file
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd ecommerce-platform
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

   This will install dependencies for both the server and client.

3. **Environment Setup**
   
   Create a `.env` file in the root directory (already included):
   ```env
   PORT=5000
   NODE_ENV=development
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   ```

4. **Start the application**
   
   For development (runs both server and client):
   ```bash
   npm run dev
   ```
   
   Or start them separately:
   ```bash
   # Terminal 1 - Backend
   npm run server
   
   # Terminal 2 - Frontend
   npm run client
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products?category=Jerseys` - Filter by category (Jerseys or Boots)

### Shopping Cart
- `GET /api/cart/:userId` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update item quantity
- `DELETE /api/cart` - Remove item from cart

### Reviews & Ratings
- `GET /api/reviews/:productId` - Get all reviews for a product
- `POST /api/reviews` - Add a review
- `GET /api/reviews/:productId/average` - Get average rating

### Checkout
- `POST /api/checkout` - Process payment

## Usage

### As a Customer

1. **Browse Products**
   - Visit the homepage to see all products
   - Use category filters to find specific items
   - Click on any product to view details

2. **Add to Cart**
   - View product details
   - Click "Add to Cart" button
   - Item is added to your cart

3. **Manage Cart**
   - View cart from navigation menu
   - Increase/decrease quantities
   - Remove unwanted items
   - See real-time totals

4. **Write Reviews**
   - Open any product page
   - Scroll to "Customer Reviews" section
   - Submit your rating and review

5. **Checkout**
   - Click "Proceed to Checkout" in cart
   - Fill shipping information
   - Enter payment details
   - Complete order

## Features in Detail

### 🛍️ Product Catalog
- 8 products: Football jerseys and boots
- Category filtering (Jerseys / Boots)
- Product cards with images
- Product detail pages with descriptions

### 🛒 Shopping Cart
- Add/remove products
- Update quantities
- Real-time price calculations
- Persistent cart (currently using userId=1)

### ⭐ Ratings & Reviews
- 5-star rating system
- Text comments and reviews
- Display average ratings
- View all customer reviews
- Review submission form

### 💳 Payment Gateway
- Mock payment processing
- Ready for Stripe integration
- Order confirmation
- Success page with auto-redirect

### 📱 Responsive Design
- Mobile-friendly navigation
- Responsive grid layouts
- Touch-friendly buttons
- Mobile menu toggle
- Adaptive typography

## Payment Integration

Currently using mock payment processing. To integrate with Stripe:

1. Get your Stripe API keys from https://stripe.com
2. Update `.env` file with your Stripe secret key
3. Modify `server/routes/checkout.js` to use Stripe SDK

Example integration:
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res) => {
  const { amount, paymentMethod } = req.body;
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency: 'usd',
  });
  
  res.json({ clientSecret: paymentIntent.client_secret });
});
```

## Customization

### Adding Products
Edit `server/routes/products.js` to add more products:
```javascript
{
  id: 9,
  name: 'Your Jersey/Boot Name',
  price: 99.99,
  description: 'Product description',
  image: 'image-url',
  category: 'Jerseys', // or 'Boots'
  inStock: true
}
```

### Styling
- Main styles: `client/src/App.css`
- Component styles: Individual `.css` files in components/pages
- Color scheme: Update gradient colors in CSS files

## Development

### Available Scripts

- `npm start` - Start server only
- `npm run dev` - Start both server and client
- `npm run server` - Start backend server with nodemon
- `npm run client` - Start React development server
- `npm run build` - Build React app for production

### Tech Stack Details

**Frontend:**
- Created with Create React App
- React Hooks for state management
- React Router for navigation
- Axios for API calls
- Modern CSS with Flexbox and Grid

**Backend:**
- Express.js REST API
- In-memory storage (ready for database integration)
- Middleware for CORS and JSON parsing
- Modular route structure

## Production Deployment

1. **Build the React app:**
   ```bash
   npm run build
   ```

2. **Deploy backend:**
   - Consider using MongoDB or PostgreSQL for data persistence
   - Use environment variables for sensitive data
   - Set up proper authentication
   - Configure HTTPS

3. **Deploy frontend:**
   - Serve from `client/build` folder
   - Configure API URL for production
   - Consider CDN for static assets

## Future Enhancements

- [ ] User authentication and profiles
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Admin panel for product management
- [ ] Order history and tracking
- [ ] Email notifications
- [ ] Search functionality
- [ ] Wishlist feature
- [ ] Social media integration
- [ ] Multi-language support

## License

MIT License - Feel free to use this project for learning or commercial purposes.

## Support

For issues or questions, please create an issue in the project repository.

---

Built with ❤️ using React and Node.js
