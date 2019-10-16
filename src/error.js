module.exports = {
    clientError(req, res, next) {
        const err = new Error("not found");
        err.status = 404;
        next(err);
    },
    errorHandler(err, req, res, next) {
        console.log(err.stack);
        res.status(err.status || 500);
        res.json({message: err.message, error: isProduction() ? {} : err.stack});
    }
};

function isProduction() {
    return process.env.NODE_ENV === "production";
}