import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import products from './data/products.js';

const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const id = req.params.id;
  const product = products.find(({ _id }) => _id === id);
  res.json(product);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
