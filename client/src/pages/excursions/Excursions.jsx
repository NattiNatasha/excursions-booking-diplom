import { useContext, useEffect } from 'react'
import Excursion from '../../components/excursion/Excursion'
import Title from '../../components/title/Title'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import {
  fetchPlaces,
  fetchCategories,
  fetchExcursions,
} from '../../http/ExcursionApi'

import './Excursions.scss'
import Slider from '../../components/slider/Slider'
import Dropdown from '../../components/dropdown/Dropdown'
import Pagination from '../../components/pagination/Pagination'

const Excursions = observer(() => {
  const { excursion } = useContext(Context)

  useEffect(() => {
    fetchCategories().then((data) => excursion.setCategories(data))
    fetchPlaces().then((data) => excursion.setPlaces(data))
    fetchExcursions().then((data) => {
      excursion.setExcursions(data.rows)
      excursion.setTotalCount(data.count)
    })
  }, [])

  useEffect(() => {
    fetchExcursions(
      excursion.selectedCategory.id,
      excursion.selectedPlace.id,
      excursion.page,
      6,
    ).then((data) => {
      excursion.setExcursions(data.rows)
      excursion.setTotalCount(data.count)
    })
  }, [excursion.page, excursion.selectedCategory, excursion.selectedPlace])

  const setPlace = (option) => {
    excursion.setSelectedPlace(option)
  }

  const setCategory = (option) => {
    excursion.setSelectedCategory(option)
  }

  return (
    <>
      <main className="page">
        <Slider />
        <Title title="Наши" addition="экскурсии" />
        <section className="search-bar">
          <Dropdown
            title={excursion.selectedPlace.name || 'Выбрать направление'}
            options={excursion.places}
            onClick={setPlace}
          />
          <Dropdown
            title={excursion.selectedCategory.name || 'Выбрать категорию'}
            options={excursion.categories}
            onClick={setCategory}
          />
        </section>
        <section className="packages">
          <div className="box-container">
            {excursion.excursions.map((excursion) => (
              <Excursion key={excursion.id} excursion={excursion} />
            ))}
          </div>
        </section>
        <Pagination />
      </main>
    </>
  )
})

export default Excursions
