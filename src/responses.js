module.exports = {
    createOrUpdate(isbn, res) {
        res.redirect("/book/" + isbn);
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
    }
};