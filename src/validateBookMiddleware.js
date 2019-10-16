const validateBook = require("./validateBook");

module.exports = function validate(req, res, next) {
    const validationErrors = validateBook(req.body);

    if(validationErrors) {
        const error = new Error();
        error.message = validationErrors;
        error.status = 400;
        next(error);
    } else {
        next();
    }
};