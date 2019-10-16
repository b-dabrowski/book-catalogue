const MongoClient = require('mongodb').MongoClient;

// const url = 'mongodb://db:27017/booksapi'; // when using docker-compose for full development
const url = 'mongodb://localhost:27017/booksapi1';

let booksPromise = MongoClient
    .connect(url, {bufferMaxEntries: 0, useNewUrlParser: true})
    .then(function (client) {
        return client.db().collection("books");
    });

module.exports = {
    async createOrUpdate({title, slug, authors, isbn, description}) {
        const books = await booksPromise;
        await books.updateOne(
            {isbn: isbn},
            {$set: {title, slug, authors, isbn, description}},
            {upsert: true}
        );
    },
    async findOne(isbn) {
        const books = await booksPromise;
        return books.findOne({isbn}, {projection: {_id: 0}});
    }
};