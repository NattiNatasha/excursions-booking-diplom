import { useContext, useEffect } from 'react'
import * as AiIcons from 'react-icons/ai'
import { Button } from '../../button/Button'
import FormInput from '../../forminput/FormInput'
import { Context } from '../../../index'
import { fetchCategories, fetchPlaces } from '../../../http/ExcursionApi'
import { observer } from 'mobx-react-lite'
import './Modal.scss'
import Dropdown from '../../dropdown/Dropdown'

const Modal = observer(
  ({
    onClick,
    titleValue,
    onChangeTitle,
    routeValue,
    onChangeRoute,
    onChangeFile,
    startValue,
    onChangeStart,
    endValue,
    onChangeEnd,
    priceValue,
    onChangePrice,
    durationValue,
    onChangeDuration,
    onChangeCategory,
    onChangePlace,
    descriptionValue,
    onChangeDescription,
    service,
    setService,
    availability,
    setAvailability,
    isOpen,
    setIsOpen,
  }) => {
    const { excursion } = useContext(Context)

    useEffect(() => {
      fetchCategories().then((data) => excursion.setCategories(data))
      fetchPlaces().then((data) => excursion.setPlaces(data))
    }, [])

    const addService = () => {
      setService([...service, { name: '', number: Date.now() }])
    }
    const removeService = (number) => {
      setService(service.filter((i) => i.number !== number))
    }
    const changeService = (key, value, number) => {
      setService(
        service.map((i) => (i.number === number ? { ...i, [key]: value } : i)),
      )
    }

    const addDate = () => {
      setAvailability([
        ...availability,
        { date: null, initial_count: 0, number: Date.now() },
      ])
    }
    const removeDate = (number) => {
      setAvailability(availability.filter((i) => i.number !== number))
    }
    const changeDate = (key, value, number) => {
      setAvailability(
        availability.map((i) =>
          i.number === number ? { ...i, [key]: value } : i,
        ),
      )
    }

    return (
      <>
        {isOpen && (
          <div className="overlay" onClick={() => setIsOpen(false)}>
            <div className="big-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-wrapper">
                <div className="modal__header">
                  <h2 className="modal__title">Добавить экскурсию</h2>
                  <AiIcons.AiOutlineClose
                    className="modal-close"
                    onClick={() => setIsOpen(false)}
                  />
                </div>
                <div className="modal__body">
                  <form>
                    <div className="row-center">
                      <FormInput
                        type="text"
                        placeholder="Добавить название"
                        inputSize={'input--large'}
                        value={titleValue}
                        onChange={onChangeTitle}
                      />
                      <FormInput
                        type="text"
                        placeholder="Маршрут"
                        inputSize={'input--large'}
                        value={routeValue}
                        onChange={onChangeRoute}
                      />
                    </div>
                    <div className="row-center">
                      <div className="select">
                        <label htmlFor="Загрузить фото:">Загрузить фото:</label>
                        <FormInput
                          type="file"
                          inputSize={'input--noborder'}
                          onChange={onChangeFile}
                        />
                      </div>
                      <FormInput
                        type="text"
                        placeholder="Время начала (чч:мм)"
                        inputSize={'input--small'}
                        value={startValue}
                        onChange={onChangeStart}
                      />
                      <FormInput
                        type="text"
                        placeholder="Время окончания (чч:мм)"
                        inputSize={'input--small'}
                        value={endValue}
                        onChange={onChangeEnd}
                      />
                    </div>
                    <div className="row-center">
                      <FormInput
                        type="number"
                        placeholder="Стоимость"
                        inputSize={'input--small'}
                        value={priceValue}
                        onChange={onChangePrice}
                      />
                      <FormInput
                        type="number"
                        placeholder="Продолжительность"
                        inputSize={'input--small'}
                        value={durationValue}
                        onChange={onChangeDuration}
                      />
                      <Dropdown
                        title={
                          excursion.selectedPlace.name || 'Выбрать направление'
                        }
                        options={excursion.places}
                        onClick={onChangePlace}
                      />
                      <Dropdown
                        title={
                          excursion.selectedCategory.name || 'Выбрать категорию'
                        }
                        options={excursion.categories}
                        onClick={onChangeCategory}
                      />
                    </div>
                    <textarea
                      placeholder="Введите описание"
                      rows={5}
                      cols={150}
                      value={descriptionValue}
                      onChange={onChangeDescription}
                    />
                    <div className="row">
                      <div className="col">
                        <Button
                          type="button"
                          buttonColor={'btn--black'}
                          buttonSize={'btn--small'}
                          onClick={addService}
                        >
                          Добавить услугу
                        </Button>
                        {service.map((i) => (
                          <div className="row-center" key={i.number}>
                            <FormInput
                              inputSize={'input--small'}
                              value={i.name}
                              onChange={(e) =>
                                changeService('name', e.target.value, i.number)
                              }
                              placeholder="Введите название услуги"
                            />
                            <Button
                              type="button"
                              buttonSize={'btn--xs'}
                              buttonColor={'btn--red'}
                              onClick={() => removeService(i.number)}
                            >
                              Удалить
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="col">
                        <Button
                          className="mb-2"
                          type="button"
                          buttonColor={'btn--black'}
                          buttonSize={'btn--small'}
                          onClick={addDate}
                        >
                          Добавить дату
                        </Button>
                        {availability.map((i) => (
                          <div className="row-center" key={i.number}>
                            <FormInput
                              type="date"
                              inputSize={'input--small'}
                              onChange={(e) =>
                                changeDate('date', e.target.value, i.number)
                              }
                            />
                            <FormInput
                              type="number"
                              inputSize={'input--small'}
                              value={i.initial_count}
                              onChange={(e) =>
                                changeDate(
                                  'initial_count',
                                  Number(e.target.value),
                                  i.number,
                                )
                              }
                              placeholder="Введите количество мест"
                            />
                            <Button
                              type="button"
                              buttonSize={'btn--xs'}
                              buttonColor={'btn--red'}
                              onClick={() => removeDate(i.number)}
                            >
                              Удалить
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal__footer">
                  <Button
                    type="button"
                    buttonColor={'btn--green'}
                    buttonSize={'btn--small'}
                    onClick={onClick}
                  >
                    Добавить
                  </Button>
                  <Button
                    buttonColor={'btn--red'}
                    buttonSize={'btn--small'}
                    onClick={() => setIsOpen(false)}
                  >
                    Закрыть
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  },
)

export default Modal
