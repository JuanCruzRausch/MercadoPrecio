const express = require('express');
const productRouter = require('./routes/productRouter');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/product', productRouter);

module.exports = app;
