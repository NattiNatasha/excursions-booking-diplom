const Router = require('express')
const router = new Router()
const excursionController = require('../controllers/excursionController')

router.post('/', excursionController.create)
router.get('/', excursionController.getAll)
router.get('/:id', excursionController.getOne)
router.put('/', excursionController.updateAvailability)

module.exports = router
