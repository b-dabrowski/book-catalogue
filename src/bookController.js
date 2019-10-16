const bookRepository = require("./bookRepository");
const bookService = require("./bookService");

module.exports = {
    async createOrUpdate(req, res, next) {
        try {
            // HTTP
            const {title, authors, isbn, description} = req.body;

            // JS
            await bookService.createOrUpdate({title, authors, isbn, description});

            // HTTP
            res.redirect("/book/" + isbn);
        } catch (e) {
            next(e);
        }
    },
    async deleteOne(req, res, next) {
        try {
            const isbn = req.params.isbn;

            await bookRepository.delete(isbn);

            res.status(204).end();
        } catch(e) {
            next(e);
        }
    },
    async details(req, res, next) {
        try {
            // HTTP
            const isbn = req.params.isbn;

            // JS
            const book = await bookRepository.findOne(isbn);

            // HTTP
            book ? res.json(book): next();
        } catch (e) {
            next(e);
        }
    }
};


// Mongo API: books.deleteOne({isbn})
