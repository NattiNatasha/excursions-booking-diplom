import { makeAutoObservable } from 'mobx'

export default class ExcursionStore {
  constructor() {
    this._categories = []
    this._places = []

    this._excursions = []

    this._selectedPlace = {}
    this._selectedCategory = {}
    this._page = 1
    this._totalCount = 0
    this._limit = 6

    makeAutoObservable(this)
  }

  setCategories(categories) {
    this._categories = categories
  }

  setPlaces(places) {
    this._places = places
  }

  setExcursions(excursions) {
    this._excursions = excursions
  }

  setSelectedPlace(place) {
    this.setPage(1)
    this._selectedPlace = place
  }

  setSelectedCategory(category) {
    this.setPage(1)
    this._selectedCategory = category
  }

  setPage(page) {
    this._page = page
  }
  setTotalCount(count) {
    this._totalCount = count
  }

  get categories() {
    return this._categories
  }

  get places() {
    return this._places
  }

  get excursions() {
    return this._excursions
  }

  get selectedPlace() {
    return this._selectedPlace
  }

  get selectedCategory() {
    return this._selectedCategory
  }

  get totalCount() {
    return this._totalCount
  }
  get page() {
    return this._page
  }
  get limit() {
    return this._limit
  }
}
