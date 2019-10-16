const bookRepository = require("./bookRepository");

module.exports = {
    async createOrUpdate(req, res, next) {
        try {
            // HTTP
            const {title, authors, isbn, description} = req.body;

            // JS
            await bookRepository.createOrUpdate({title, authors, isbn, description});

            // HTTP
            res.json({title, authors, isbn, description});
        } catch (e) {
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
            res.json(book);
        } catch (e) {
            next(e);
        }
    }
};

