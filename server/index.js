const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = require('./src/app');

const PORT = process.env.PORT || 8080;

const DB = process.env.DATABASE.replace('<password>', process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then((con) => console.log('Connected to the database'))
  .catch((err) => {
    throw err;
  });

app.listen(process.env.PORT || 5050, () => {
  console.log(`Server listening in port ${PORT}`);
});
