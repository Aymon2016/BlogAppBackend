
const articleService = require('../../../../lib/article/index');


const updateItem = async (req, res, next) => {

    const { id } = req.params;
    const cover = req.body.cover;
    const status = req.body.status;

    try {

        const { article, code } = await articleService.updateOrCreate(id, { title: req.body.title, body: req.body.body, author: req.user, cover, status })

        const response = {
            code: code,
            data: article,
            message: code === 200 ? 'Article update successfull' : 'Article create successfully',
            links: {
                self: `article/${article.id}`
            }
        }
        res.status(code).json(response)
    } catch (e) {
        next(e)
    }
}

module.exports = updateItem;