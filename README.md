This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It uses Express JS to start a backend server to serve the requests to the React frontend client.

## Use case
As a small business owner, I want to process a one-time card payment from a US customer for the purchase of an item that costs $10.99; 

PaymentIntent instructions can be found here: https://stripe.com/docs/payments/accept-a-payment#web-setup

## Setup
Clone this repository into a <local folder>;
```
cd <local folder>
```

## Install all dependencies

```
npm install
```

## Create the .env file

```
cp .env.example .env
```
Edit the .env file and add the stripe keys to it. Remember to also update the public key in src/App.js


## Start the backend server
In a terminal, run the command below - 
```
npm run backend 
```

## Start the front end server
Open another terminal, and run the command below - 

```
npm run frontend
```
