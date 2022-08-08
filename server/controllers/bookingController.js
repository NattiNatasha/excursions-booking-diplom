const { Booking } = require('../models/models')
const ApiError = require('../error/ApiError')

class BookingController {
  async create(req, res, next) {
    try {
      let {
        date,
        excursion_name,
        tourists_quantity,
        amount,
        status,
        userId,
        excursionId,
      } = req.body

      const booking = await Booking.create({
        date,
        excursion_name,
        tourists_quantity,
        amount,
        status,
        userId,
        excursionId,
      })

      return res.json(booking)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
  async getAll(req, res) {
    let { userId } = req.query
    let bookings
    if (!userId) {
      bookings = await Booking.findAll()
    }

    if (userId) {
      bookings = await Booking.findAll({
        where: { userId },
      })
    }
    return res.json(bookings)
  }
}

module.exports = new BookingController()
