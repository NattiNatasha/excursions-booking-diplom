import { useState, useContext } from 'react'
import { Context } from '../../index'
import { Button } from '../../components/button/Button'
import Modal from '../../components/modals/modal/Modal'
import ModalCreate from '../../components/modals/modalcreate/ModalCreate'
import {
  createCategory,
  createPlace,
  createExcursion,
} from '../../http/ExcursionApi'
import './Admin.scss'
import { observer } from 'mobx-react-lite'

const Admin = observer(() => {
  const { excursion } = useContext(Context)
  const [categoryVisible, setCategoryVisible] = useState(false)
  const [placeVisible, setPlaceVisible] = useState(false)
  const [excursionVisible, setExcursionVisible] = useState(false)

  const [value, setValue] = useState('')

  const [title, setTitle] = useState('')
  const [route, setRoute] = useState('')
  const [file, setFile] = useState(null)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [price, setPrice] = useState(0)
  const [duration, setDuration] = useState(0)
  const [description, setDescription] = useState('')
  const [service, setService] = useState([])
  const [availability, setAvailability] = useState([])

  const selectFile = (e) => {
    setFile(e.target.files[0])
  }

  const addExcursion = () => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('route', route)
    formData.append('img', file)
    formData.append('start', start)
    formData.append('end', end)
    formData.append('price', price)
    formData.append('duration', duration)
    formData.append('placeId', excursion.selectedPlace.id)
    formData.append('categoryId', excursion.selectedCategory.id)
    formData.append('description', description)
    formData.append('service', JSON.stringify(service))
    formData.append('availability', JSON.stringify(availability))
    createExcursion(formData).then((data) => setExcursionVisible(false))
  }

  const setCategory = (option) => {
    excursion.setSelectedCategory(option)
  }
  const setPlace = (option) => {
    excursion.setSelectedPlace(option)
  }

  const addCategory = () => {
    createCategory({ name: value }).then((data) => {
      setValue('')
      setCategoryVisible(false)
      alert('Категория создана успешно!')
    })
  }

  const addPlace = () => {
    createPlace({ name: value }).then((data) => {
      setValue('')
      setPlaceVisible(false)
      alert('Направление создано успешно!')
    })
  }

  return (
    <main className="auth-page">
      <div className="page-container">
        <div className="categories">
          <h2 className="categories__title">Категории</h2>
          <div className="categories__btn">
            <Button
              buttonSize={'btn--small'}
              buttonColor={'btn--green'}
              onClick={() => setCategoryVisible(true)}
            >
              Добавить
            </Button>
          </div>
        </div>
        <div className="categories">
          <h2 className="categories__title">Направления</h2>
          <div className="categories__btn">
            <Button
              buttonSize={'btn--small'}
              buttonColor={'btn--green'}
              onClick={() => setPlaceVisible(true)}
            >
              Добавить
            </Button>
          </div>
        </div>
        <div className="categories">
          <h2 className="categories__title">Экскурсии</h2>
          <div className="categories__btn">
            <Button
              buttonSize={'btn--small'}
              buttonColor={'btn--green'}
              onClick={() => setExcursionVisible(true)}
            >
              Добавить
            </Button>
          </div>
        </div>
      </div>
      <ModalCreate
        onClick={addCategory}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        title="Добавить категорию"
        isOpen={categoryVisible}
        setIsOpen={() => setCategoryVisible(false)}
        placeholder="Добавить категорию"
        type="text"
      />
      <ModalCreate
        onClick={addPlace}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        title="Добавить направление"
        isOpen={placeVisible}
        setIsOpen={() => setPlaceVisible(false)}
        placeholder="Добавить направление"
        type="text"
      />
      <Modal
        onClick={addExcursion}
        titleValue={title}
        onChangeTitle={(e) => setTitle(e.target.value)}
        routeValue={route}
        onChangeRoute={(e) => setRoute(e.target.value)}
        onChangeFile={selectFile}
        startValue={start}
        onChangeStart={(e) => setStart(e.target.value)}
        endValue={end}
        onChangeEnd={(e) => setEnd(e.target.value)}
        priceValue={price}
        onChangePrice={(e) => setPrice(Number(e.target.value))}
        durationValue={duration}
        onChangeDuration={(e) => setDuration(Number(e.target.value))}
        onChangeCategory={setCategory}
        onChangePlace={setPlace}
        descriptionValue={description}
        onChangeDescription={(e) => setDescription(e.target.value)}
        service={service}
        setService={setService}
        availability={availability}
        setAvailability={setAvailability}
        isOpen={excursionVisible}
        setIsOpen={() => setExcursionVisible(false)}
      />
    </main>
  )
})

export default Admin
