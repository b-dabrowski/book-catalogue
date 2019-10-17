module.exports = db => {
    const books = db.collection("books");
    return {
        async createOrUpdate(book) {
            // const books = await booksPromise;
            await books.updateOne(
                {isbn: book.isbn},
                {$set: book},
                {upsert: true}
            );
        },
        async findOne(isbn) {
            // const books = await booksPromise;
            return books.findOne({isbn}, {projection: {_id: 0}});
        },
        async findAll() {
            // const books = await booksPromise;
            return books
                .find()
                .toArray();
        },
        async delete(isbn) {
            // const books = await booksPromise;
            return books.deleteOne({isbn});
        }
    }
};