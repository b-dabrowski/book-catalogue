const router = require("express").Router();
const {createOrUpdate, details, deleteOne} = require("./bookController");
const validateBook = require("./validateBookMiddleware");

router.post("/book", validateBook, createOrUpdate);
router.get("/book/:isbn", details);
router.delete("/book/:isbn", deleteOne);

module.exports = router;