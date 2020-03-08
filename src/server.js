const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express(); // Using Express JS to make calls to the server; Reference: https://frontend.turing.io/lessons/module-4/intro-to-express.html?ads_cmpid=6451354298&ads_adid=76255849919&ads_matchtype=b&ads_network=g&ads_creative=421933531127&utm_term=&ads_targetid=dsa-310094130363&utm_campaign=&utm_source=adwords&utm_medium=ppc&ttv=2&gclid=EAIaIQobChMIrdyVgL-L6AIVC9lkCh3SmQC2EAAYASAAEgIzWPD_BwE
const cors = require('cors') // Express port is running on 8080; React server is running on localhost port; When the client makes a request, we want to ensure it has access to the backend running on expressJS
const stripe = require('stripe')('sk_test_3mxz6b2LGZUClvwKN60URSem00ZV2gleMp'); //Set the secret key in the server


app.use(express.static(path.join(__dirname, 'build')));
app.use(cors())


app.get('/ping', function (req, res) {  // Testing the ping from express JS server
 return res.send('pong');
});

//Creating a Stripe PaymentIntent request with the amount and currency value specified.

app.post('/create-payment-intent', async (req, res) => {   
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
    // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'accept_a_payment'},
  });

  // Send publishable key and PaymentIntent details to client
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    clientSecret: paymentIntent.client_secret
  });
});

app.listen(process.env.PORT || 8080);