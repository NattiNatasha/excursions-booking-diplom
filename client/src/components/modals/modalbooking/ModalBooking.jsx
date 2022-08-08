import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as AiIcons from 'react-icons/ai'
import { Button } from '../../button/Button'
import {
  fetchOneExcursion,
  createBooking,
  updateAvailability,
} from '../../../http/ExcursionApi'
import { observer } from 'mobx-react-lite'
import './ModalBooking.scss'
import FormInput from '../../forminput/FormInput'
import jwt_decode from 'jwt-decode'
import { MYBOOKINGS_ROUTE } from '../../../utils/consts'

const ModalBooking = observer(({ isOpen, setIsOpen }) => {
  let navigate = useNavigate()
  const getUserData = () => {
    const currentUser = localStorage.getItem('token')
    return jwt_decode(currentUser)
  }

  const user = getUserData()

  const [excursion, setExcursion] = useState({ service: [], availability: [] })
  const [availabilityId, setAvailabilityId] = useState(0)
  const [date, setDate] = useState(null)
  const [initialCount, setInitialCount] = useState(0)
  const [salesCount, setSalesCount] = useState(0)
  const [count, setCount] = useState(1)
  const { id } = useParams()
  useEffect(() => {
    fetchOneExcursion(id).then((data) => setExcursion(data))
  }, [id])

  const handleClick = (item) => {
    setAvailabilityId(item.id)
    setDate(item.date)
    setInitialCount(item.initial_count)
    setSalesCount(item.sales_count)
  }

  const addBooking = () => {
    createBooking({
      tourists_quantity: count,
      excursion_name: excursion.title,
      amount: count * excursion.price,
      date: date,
      userId: user.id,
      excursionId: excursion.id,
    }).then((data) => {
      setSalesCount(salesCount + count)
      setIsOpen(false)
      //navigate(MYBOOKINGS_ROUTE)
      alert('Бронирование создано успешно!')
    })
  }

  useEffect(() => {
    updateAvailability({
      id: availabilityId,
      sales_count: salesCount,
    }).then((data) => console.log(data))
  }, [salesCount])

  return (
    <>
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="booking-modal__header">
              <AiIcons.AiOutlineClose
                className="modal-close"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <div className="modal__body">
              <h1 className="booking-modal__title">{excursion.title}</h1>
              <form className="form">
                <div className="dropdown">
                  <Button type="button" buttonColor={'btn--black'}>
                    {date || 'Выбрать дату'}
                  </Button>
                  <div className="dropdown__content">
                    {excursion.availability.map((item) => (
                      <span onClick={() => handleClick(item)} key={item.id}>
                        {item.date}
                      </span>
                    ))}
                  </div>
                </div>
                <FormInput
                  type="number"
                  min={1}
                  max={initialCount - salesCount}
                  placeholder="Выбрать количество человек"
                  value={count}
                  onBlur={(e) =>
                    Number(e.target.value) > 0 &&
                    Number(e.target.value) <= initialCount - salesCount
                      ? setCount(Number(e.target.value))
                      : alert('Некорректное количество человек')
                  }
                />
                <p className="amount">Сумма: {count * excursion.price} руб.</p>
              </form>
            </div>
            <div className="modal__footer">
              <Button
                buttonColor={'btn--green'}
                buttonSize={'btn--small'}
                onClick={addBooking}
              >
                Забронировать
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
      )}
    </>
  )
})

export default ModalBooking
