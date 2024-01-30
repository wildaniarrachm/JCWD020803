import { Router } from 'express';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripeRouter = Router();

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  'whsec_cf172ad5a82edf6b9e1112c1435486192e0b0a7afde1e5df2f9e2db2ed418f27';

stripeRouter.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      console.log('Webhook verified');
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send().end();
  },
);

export { stripeRouter };
