const Article = require('../../model/Article')

const { notFound, badRequest } = require('../../utilis/error')

const restrictedPath = ['id', '_id', 'author', 'createdAt', 'updateAt']


const updateArticleV2 = async (id, operations = []) => {

    const article = Article.findById(id)

    if (!article) {
        throw notFound()
    }

    for (let operation of operations) {

        const { op, path, value } = operation;

        if (restrictedPath.includes(path)) {
            throw badRequest(`path ${path} not permitted`)
        }

        switch (op) {
            case 'replace':
                article[path] = value
                break;
            case 'add':
                article._doc[path] = value
                break;
            case 'remove':
                delete article[path]
                break;
            default:
                throw badRequest(`Invalid operation: ${op}`)
        }
    }

    await article.save()
    return article._doc;
}

const replace = () => {

}
module.exports = updateArticleV2;