const Router = require('express')
const router = new Router()
const placeController = require('../controllers/placeController')

router.post('/', placeController.create)
router.get('/', placeController.getAll)

module.exports = router
