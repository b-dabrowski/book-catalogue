const express = require("express");
const bookRoutes = require("./bookRoutes");
const app = express();
const {clientError, errorHandler} = require("./error");

app.use(express.json());
app.use(bookRoutes);
app.use(clientError);
app.use(errorHandler);

module.exports = app;