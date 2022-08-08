const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const excursionRouter = require('./excursionRouter')
const placeRouter = require('./placeRouter')
const bookingRouter = require('./bookingRouter')

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/excursion', excursionRouter)
router.use('/place', placeRouter)
router.use('/booking', bookingRouter)

module.exports = router
