module.exports = db => {
    const express = require("express");
    const bookRoutes = require("./bookRoutes")(db);
    const app = express();
    const {clientError, errorHandler} = require("./error");
    const path = require("path");

    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "hbs");

    app.use(express.json());
    app.use(bookRoutes);
    app.use(clientError);
    app.use(errorHandler);

    return app;
};