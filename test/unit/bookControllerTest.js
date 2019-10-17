const bookControllerFactory = require("../../src/book/bookController");
const assert = require("assert");

describe("Book controller", function() {
    it("create or update happy path", async function() {
        // given
        const req = {
            body: {
                isbn: "ISBN"
            }
        };
        const res = {
            redirect(path) {
                res.redirect.invokedWith = path;
            }
        };
        const bookService = {
            async createOrUpdate({isbn}) {
                bookService.createOrUpdate.invokedWithISBN = isbn;
            }
        };
        const bookController = bookControllerFactory({bookService});

        // when
        await bookController.createOrUpdate(req, res);

        // then
        assert.deepStrictEqual(res.redirect.invokedWith, "/book/ISBN");
        assert.deepStrictEqual(bookService.createOrUpdate.invokedWithISBN, "ISBN");
    });

    it("create or update unhappy path", async function() {
        // given
        const req = {body: {}};
        const res = {};
        const next = function(error) {
            next.invokedWith = error;
        };
        const bookService = {
            async createOrUpdate() {
                throw "error";
            }
        };
        const bookController = bookControllerFactory({bookService});

        // when
        await bookController.createOrUpdate(req, res, next);

        // then
        assert.deepStrictEqual(next.invokedWith, "error")
    });
});