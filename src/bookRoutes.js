const router = require("express").Router();
const bookRepository = require("./bookRepository");
const bookService = require("./bookService")(bookRepository);
const {createOrUpdate, details, deleteOne, list} = require("./bookController")({bookService, bookRepository});
const validateBook = require("./validateBookMiddleware");

router.post("/book", validateBook, createOrUpdate);
router.get("/book/:isbn", details);
router.get("/book", list);
router.delete("/book/:isbn", deleteOne);

module.exports = router;