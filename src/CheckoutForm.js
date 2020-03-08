import React from 'react';
import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js';

import CardSection from './CardSection';

class CheckoutForm extends React.Component {
  handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    var orderData = {
        currency: "usd"
      };

    //stripe here would get the public key
    //elements would hold the contents of the form submission (card number, expiry date, zipcode)
    var {stripe, elements} = this.props

    //Make the server call to fetch the client secret

    fetch("http://localhost:8080/create-payment-intent", {
        method: "POST",
       mode: 'cors',
        headers: {
          "Content-Type": "application/json",
         'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify(orderData)
      })
      .then(result => {
        return result.json();
      })
      // With the results, confirm the card payment
      .then(async data => {
          const result = await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: 'Jenny Rosen',
              },
            }
          });
      
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
                console.log('successful payment!')
              // Show a success message to your customer
              // There's a risk of the customer closing the window before callback
              // execution. Set up a webhook or plugin to listen for the
              // payment_intent.succeeded event that handles any business critical
              // post-payment actions.
            }
          }
      })
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <button disabled={!this.props.stripe}>Confirm order</button>
      </form>
    );
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({stripe, elements}) => (
        <CheckoutForm  stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}