
const Article = require('../../model/Article')

const create = ({ title, body = '', cover = '', status = 'draft', author }) => {
    if (!title || !author) {
        const error = new Error('Invalid parameters');
        error.status = 400;
        throw error;
    }

    const article = new Article({
        title,
        body,
        cover,
        status,
        author: author.id,
    });
    return article.save();
};
module.exports = create;