module.exports = db => {
    const {BOOK, BOOK_COLLECTION} = require("./links").resources;
    const router = require("express").Router();
    const bookRepository = require("./bookRepository")(db);
    const bookService = require("./bookService")(bookRepository);
    const {createOrUpdate, details, deleteOne, list} = require("./bookController")({bookService, bookRepository});
    const validateBook = require("./validateBookMiddleware");

    router.post(BOOK_COLLECTION, validateBook, createOrUpdate);
    router.get(BOOK_COLLECTION, list);
    router.get(BOOK, details);
    router.delete(BOOK, deleteOne);

    return router;
};