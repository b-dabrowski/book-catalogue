const bookControllerFactory = require("../../src/bookController");
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
});