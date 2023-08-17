
const service = require('../../../../lib/article')

const updateItemPatch = async () => {

    try {
        const article = await service.updateArticleV2(req.params.id, req.body)
    } catch (e) {
        next(e)
    }

}
module.exports = updateItemPatch;