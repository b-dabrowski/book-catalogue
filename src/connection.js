const MongoClient = require('mongodb').MongoClient;

// const url = 'mongodb://db:27017/booksapi'; // when using docker-compose for full development
const url = 'mongodb://localhost:27017/booksapi';

const db = MongoClient
    .connect(url, {bufferMaxEntries: 0, useNewUrlParser: true})
    .then(function (client) {
        return client.db();
    });

module.exports = db;