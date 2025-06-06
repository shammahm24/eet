const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


async function createPaymentSession(req, res) {
    //const { amount, product, } = req.body;
    console.log("Creating payment session...");
    const session = await stripe.checkout.sessions.create({
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'T-shirt',
        },
        unit_amount: 2000,
      },
      quantity: 1,
    }],
    mode: 'payment',
    ui_mode: 'embedded',
    return_url: 'http://localhost:3000/booking-progress/complete'
  });

    console.log("Payment session created successfully.");
    console.log(session);
  res.send({clientSecret: session.client_secret});
}

module.exports = {
    createPaymentSession
}