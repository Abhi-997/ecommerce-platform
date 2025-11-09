const express = require('express');
const router = express.Router();

// Initialize Stripe only if key is provided
let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
}

// Create payment intent (for real Stripe integration)
router.post('/create-payment-intent', async (req, res) => {
  if (!stripe) {
    return res.status(400).json({ error: 'Stripe not configured. Add STRIPE_SECRET_KEY to .env file' });
  }
  
  try {
    const { amount } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// Process payment (simplified for demo)
router.post('/', async (req, res) => {
  try {
    const { userId, amount, paymentMethod } = req.body;
    
    // For demo purposes, we'll simulate payment
    // In production, use the payment intent confirmation
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const paymentIntent = {
      id: `pi_${Date.now()}`,
      status: 'succeeded',
      amount: amount,
      currency: 'usd',
      created: new Date().toISOString()
    };
    
    res.json({
      success: true,
      payment: paymentIntent,
      message: 'Payment successful! Order confirmed.'
    });
  } catch (error) {
    res.status(500).json({ error: 'Payment processing failed' });
  }
});

module.exports = router;
