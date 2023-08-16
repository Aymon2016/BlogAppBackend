const notFound = (mgs = 'Resource Not Found') => {
    const error = new Error(mgs)
    error.status = 404;
    return error;
}
module.exports = notFound;