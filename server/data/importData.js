const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../src/models/productModel.js');
require('dotenv').config({ path: '../.env' });

const DB = process.env.DATABASE.replace('<password>', process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then((con) => console.log('Connected to the database'))
  .catch((err) => {
    throw err;
  });

// Read JSON file
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/productData.json`, 'utf-8'),
);

// Import data
const importData = async () => {
  try {
    await Product.create(products);
    console.log('Data successfully loaded!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// Delete data
const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data successfully deleted!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Invalid argument');
  process.exit();
}
