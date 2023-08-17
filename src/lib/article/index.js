
const Article = require('../../model/Article');
const defaults = require('../../config/defaults');
const { NotFound } = require('express-openapi-validator/dist/openapi.validator');
const updateArticleV2 = require('./updateArticleV2')


const removeItem = async (id) => {

    const article = await Article.findById(id);
    if (!article) {
        throw NotFound()
    }

    return Article.findByIdAndDelete(id)
}

const updateProperties = async (id, { title, body, cover, status }) => {

    const article = await Article.findById(id);

    if (!article) {
        throw NotFound()
    }
    const payload = {
        title,
        body,
        cover,
        status,
    }

    Object.keys(payload).forEach(key => {

        article[key] = payload[key] ?? article[key]
    })
    // article.title = title ?? article.title
    // article.body = body ?? article.body
    // article.cover = cover ?? article.cover
    // article.status = status ?? article.status

    await article.save()

    return { ...article._doc, id: article.id }

}
const updateOrCreate = async (
    id,
    {
        title, body, author, cover = '', status = 'draft'
    }
) => {

    const article = await Article.findById(id)
    if (!article) {
        const article = await create({ title, body, cover, status, author })
        return {
            article,
            code: 201
        }
    }
    const payload = {
        title, body,
        cover,
        code,
        author: author.id
    }
    article.overwrite(payload)
    await article.save()
    return {
        article: { ...article._doc, id: article.id },
        code: 200,
    }

}



const count = ({ search = '' }) => {
    const filter = {
        title: { $regex: search, $options: 'i' },
    };

    return Article.count(filter);
};

const create = async ({ title, body = '', cover = '', status = 'draft', author }) => {
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

    await article.save();

    return {
        ...article._doc,
        id: article.id,
    };
};
const findAll = async ({
    page = defaults.page,
    limit = defaults.limit,
    sortType = defaults.sortType,
    sortBy = defaults.sortBy,
    search = defaults.search
}) => {
    const sortStr = `${sortType === 'dsc' ? '-' : ''}${sortBy}`;
    const filter = {
        title: { $regex: search, $options: 'i' },
    };

    const articles = await Article.find(filter)
        .populate({ path: 'author', select: 'name' })
        .sort(sortStr)
        .skip(page * limit - limit)
        .limit(limit);


    return articles.map((article) => ({
        ...article._doc,
        id: article.id,
    }));

};

const findSingleItem = async ({ id, expand = '' }) => {
    if (!id) throw new Error('Id is required');

    expand = expand.split(',').map((item) => item.trim());

    const article = await Article.findById(id);

    if (!article) {

        throw NotFound()

    }

    if (expand.includes('author')) {
        await article.populate({
            path: 'author',
            select: 'name',
            strictPopulate: false
        });
    }

    if (expand.includes('comment')) {
        await article.populate({
            path: 'comments',
            strictPopulate: false
        });
    }

    return {
        ...article._doc,
        id: article.id,
    };
};

module.exports = {
    create,
    findAll,
    count,
    findSingleItem,
    updateOrCreate,
    updateProperties,
    removeItem,
    updateArticleV2,
};