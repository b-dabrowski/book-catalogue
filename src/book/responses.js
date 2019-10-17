const {bookLink} = require("./links");

module.exports = {
    createOrUpdate(isbn, res) {
        res.redirect(bookLink(isbn));
    },
    delete(res) {
        res.status(204).end();
    },
    details({book, layout}, res, next) {
        book ? res.format({
            "text/html"() {
                res.render("book", {book, layout});
            },
            "application/json"() {
                res.json(book);
            },
            "default"() {
                res.json(book);
            }
        }) : next();
    },
    list(books, res) {
        res.format({
            'text/html'() {
                res.render("books", {books: books.map(book => ({...book, link: bookLink(book.isbn)}))});
            },
            'application/json'() {
                res.json(books);
            },
            'default'() {
                res.json(books);
            }
        });
    }
};