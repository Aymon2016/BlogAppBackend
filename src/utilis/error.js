const notFound = (mgs = 'Resource Not Found') => {
    const error = new Error(mgs)
    error.status = 404;
    return error;
}

const badRequest (msg = 'Bad Request') => {

    const error = new Error(msg)
    error.status = 400;
    return error
}
module.exports = { notFound, badRequest };