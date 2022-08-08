const { Excursion, Availability, Service } = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class ExcursionController {
  async create(req, res, next) {
    try {
      let {
        title,
        route,
        start,
        end,
        price,
        duration,
        placeId,
        categoryId,
        description,
        service,
        availability,
      } = req.body
      const { img } = req.files
      let fileName = uuid.v4() + '.png'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))

      const excursion = await Excursion.create({
        title,
        route,
        img: fileName,
        start,
        end,
        price,
        duration,
        placeId,
        categoryId,
        description,
        service,
        availability,
      })

      if (service) {
        service = JSON.parse(service)
        service.forEach((i) => {
          Service.create({
            name: i.name,
            excursionId: excursion.id,
          })
        })
      }

      if (availability) {
        availability = JSON.parse(availability)
        availability.forEach((i) => {
          Availability.create({
            date: i.date,
            initial_count: i.initial_count,
            excursionId: excursion.id,
          })
        })
      }

      return res.json(excursion)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
  async getAll(req, res) {
    let { categoryId, placeId, limit, page } = req.query
    page = page || 1
    limit = limit || 6
    let offset = page * limit - limit
    let excursions
    if (!categoryId && !placeId) {
      excursions = await Excursion.findAndCountAll({
        limit,
        offset,
      })
    }

    if (categoryId && !placeId) {
      excursions = await Excursion.findAndCountAll({
        where: { categoryId },
        limit,
        offset,
      })
    }

    if (!categoryId && placeId) {
      excursions = await Excursion.findAndCountAll({
        where: { placeId },
        limit,
        offset,
      })
    }

    if (categoryId && placeId) {
      excursions = await Excursion.findAndCountAll({
        where: { categoryId, placeId },
        limit,
        offset,
      })
    }
    return res.json(excursions)
  }
  async getOne(req, res) {
    const { id } = req.params
    const excursion = await Excursion.findOne({
      where: { id },
      include: [
        { model: Availability, as: 'availability' },
        { model: Service, as: 'service' },
      ],
    })
    return res.json(excursion)
  }
  async updateAvailability(req, res) {
    const { id, sales_count } = req.body

    const availabilityToUpdate = await Availability.findOne({
      where: { id },
    })

    const updatedSalesCount = await availabilityToUpdate.update({ sales_count })
    await updatedSalesCount.save()
    return res.json('updated')
  }
}

module.exports = new ExcursionController()
