const express = require("express");
const app = express();

const MongoClient = require('mongodb').MongoClient;


// const url = 'mongodb://db:27017/booksapi'; // when using docker-compose for full development
const url = 'mongodb://localhost:27017/booksapi1';

let booksPromise = MongoClient
    .connect(url)
    .then(function (client) {
        return client.db().collection("books");
    });

// duck typing
function log(req, res, next) {
    // console.log("new request at " + new Date());
    next();
}

function auth(req, res, next) {
    // console.log("auth");
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

app.post("/book", function (req, res) {

    const {title, authors, isbn, description} = req.body;
    booksPromise.then(function (books) {
        books.updateOne(
            {isbn: isbn},
            {$set: {title, authors, isbn, description}},
            {upsert: true}
        );
    });

    res.json({title, authors, isbn, description});
});

app.get("/book/:isbn", function (req, res, next) {
    const isbn = req.params.isbn;
    booksPromise
        .then(function (books) {
            return books.findOne({isbn}, {projection: {_id: 0}});
        })
        .then(function (book) {
            res.json(book);
        })
        .catch(next);

});
app.use(function (req, res, next) {
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