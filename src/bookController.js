const mapValues = require("lodash.mapvalues");
const responses = require("./responses");

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
        responses.createOrUpdate(isbn, res);
    },
    async deleteOne(req, res, next) {
        const isbn = req.params.isbn;

        await bookRepository.delete(isbn);

        responses.delete(res)
    },
    async list(req, res, next) {
        const books = await bookRepository.findAll();

        responses.list(books, res);
    },
    async details(req, res, next) {
        // HTTP
        const nolayout = req.query.nolayout;
        const layout = nolayout == null ? "layout": "";
        const isbn = req.params.isbn;

        // JS
        const book = await bookRepository.findOne(isbn);

        // HTTP
        responses.details({book, layout}, res, next);
    }
});

