const express = require("express");
const app = express();

// duck typing
function log(req, res, next) {
    console.log("new request at " + new Date());
    next();
}

function auth(req, res, next) {
    console.log("auth");
    next();
}

app.use(express.json());
app.use(log);
app.use(auth);

app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.get("/hello", function (req, res) {
    res.send("Hello World!");
});
app.post("/book", function(req, res) {
    // destructuring from ES6
    const {title, authors, isbn, description} = req.body;
    res.json({title, authors, isbn, description});
});
app.use(function(req, res, next) {
    const err = new Error("not found");
    err.status = 404;
    next(err);
});

app.use(function errorHandler(err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({message: err.message, error: err.stack});
});


module.exports = app;