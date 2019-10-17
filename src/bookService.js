const makeSlug = require("./makeSlug");

module.exports = bookRepository => ({
    async createOrUpdate(book) {
        const slug = makeSlug(book.title);
        return await bookRepository.createOrUpdate({...book, slug});
    }
});