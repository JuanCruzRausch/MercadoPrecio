const express = require('express');
const cors = require('cors');
const productRouter = require('./routes/productRouter');

const app = express();

app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/product', productRouter);

module.exports = app;
