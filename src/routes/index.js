const router = require('express').Router();
const { controllers: articleController } = require('../api/v1/article');
const { controllers: articleControllerV2 } = require('../api/v2/article/index')
const { controllers: authController } = require('../api/v1/auth');
// Auth routes
router
    .post('/api/v1/auth/register', authController.register)
    .post('/api/v1/auth/login', authController.login);

router
    .route('/api/v1/articles')
    .get(articleController.findAll)
    .post(articleController.create);

router
    .route('/api/v1/articles/:id')
    .get(() => { articleController.findSingle })
    .put(() => { articleController.updateItem })
    .patch(() => { articleController.updateItemPatch })
    .delete(() => { articleController.removeItem });

router
    .route('/api/v2/articles/:id')
    .patch(articleControllerV2.updateItemPatch)

module.exports = router;