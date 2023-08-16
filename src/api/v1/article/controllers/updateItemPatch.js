
const articleService = require('../../../../lib/article/index');


const updateItem = async (req, res, next) => {

    const { id } = req.params;


    try {

        const article = await articleService.updateProperties(id, req.body)

        const response = {
            code: 200,
            data: article,
            message: 'Article update successfull',
            links: {
                self: `article/${article.id}`
            }
        }
        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

module.exports = updateItem;