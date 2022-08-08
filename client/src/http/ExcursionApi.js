import { $authHost, $host } from './index'

export const createCategory = async (category) => {
  const { data } = await $authHost.post('api/category', category)
  return data
}

export const fetchCategories = async () => {
  const { data } = await $host.get('api/category')
  return data
}

export const createPlace = async (place) => {
  const { data } = await $authHost.post('api/place', place)
  return data
}

export const fetchPlaces = async () => {
  const { data } = await $host.get('api/place')
  return data
}

export const createExcursion = async (excursion) => {
  const { data } = await $authHost.post('api/excursion', excursion)
  return data
}

export const createBooking = async (booking) => {
  const { data } = await $authHost.post('api/booking', booking)
  return data
}

export const fetchBookings = async (userId) => {
  const { data } = await $authHost.get('api/booking', {
    params: {
      userId,
    },
  })
  return data
}

export const fetchExcursions = async (categoryId, placeId, page, limit = 6) => {
  const { data } = await $host.get('api/excursion', {
    params: {
      categoryId,
      placeId,
      page,
      limit,
    },
  })
  return data
}

export const fetchOneExcursion = async (id) => {
  const { data } = await $host.get('api/excursion/' + id)
  return data
}

export const updateAvailability = async (id, sales_count) => {
  const { data } = await $authHost.put('api/excursion', id, sales_count)
  return data
}
