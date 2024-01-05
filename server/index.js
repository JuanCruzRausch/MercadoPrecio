const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT || 8080;

const DB = process.env.DATABASE.replace("<password>", process.env.DB_PASSWORD);
console.log(DB);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => console.log("Conectado a la base de datos"))
  .catch((err) => {
    throw err;
  });

app.listen(process.env.PORT || 5050, () => {
  console.log(`Server listening in port ${PORT}`);
});
