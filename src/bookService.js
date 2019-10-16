const bookRepository = require("./bookRepository");
const makeSlug = require("./makeSlug");

module.exports = {
    async createOrUpdate({title, authors, isbn, description}) {
        const slug = makeSlug(title);
        return await bookRepository.createOrUpdate({title, authors, isbn, description, slug});
    }
};