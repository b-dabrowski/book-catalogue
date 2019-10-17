const mapValues = require("lodash.mapvalues");

const wrapWithTryCatch1 = fn =>
    (req, res, next) =>
        Promise.resolve(fn(req, res, next)).catch(next);

// function wrapWithTyCatch(fn) {
//     return function(req, res, next) {
//         return Promise.resolve(fn(req, res, next)).catch(next);
//     }
// }

function wrapWithTryCatch(fn) {
    return async function (req, res, next) {
        try {
            await fn(req, res, next);
        } catch (e) {
            next(e);
        }
    };
}

function withErrorHandling(api) {
    return mapValues(api, wrapWithTryCatch);
}

module.exports = ({bookService, bookRepository}) => withErrorHandling({
    async createOrUpdate(req, res, next) {
        // HTTP
        const {title, authors, isbn, description} = req.body;

        // JS
        await bookService.createOrUpdate({title, authors, isbn, description});

        // HTTP
        res.redirect("/book/" + isbn);
    },
    async deleteOne(req, res, next) {
        const isbn = req.params.isbn;

        await bookRepository.delete(isbn);

        res.status(204).end();
    },
    async details(req, res, next) {
        // HTTP
        const nolayout = req.query.nolayout;
        const layout = typeof nolayout === "undefined" ? "layout": "";
        const isbn = req.params.isbn;

        // JS
        const book = await bookRepository.findOne(isbn);

        // HTTP
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
});

