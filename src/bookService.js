const bookRepository = require("./bookRepository");
const makeSlug = require("./makeSlug");

module.exports = {
    async createOrUpdate(book) {
        const slug = makeSlug(book.title);
        return await bookRepository.createOrUpdate({...book, slug});
    }
};