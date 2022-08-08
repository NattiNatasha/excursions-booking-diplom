import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Title from '../../components/title/Title'
import ModalBooking from '../../components/modals/modalbooking/ModalBooking'
import { Button } from '../../components/button/Button'
import { Context } from '../../index'
import { fetchOneExcursion } from '../../http/ExcursionApi'
import { LOGIN_ROUTE } from '../../utils/consts'
import * as FaIcons from 'react-icons/fa'
import './ExcursionPage.scss'

const ExcursionPage = () => {
  const { user } = useContext(Context)

  const [excursion, setExcursion] = useState({ service: [], availability: [] })
  const [bookingFormVisible, setBookingFormVisible] = useState(false)
  const { id } = useParams()
  useEffect(() => {
    fetchOneExcursion(id).then((data) => setExcursion(data))
  }, [id])

  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  return (
    <>
      <main className="page">
        <section className="packages">
          <img
            className="packages__img"
            src={process.env.REACT_APP_API_URL + excursion.img}
            alt={excursion.id}
          />
          <Title title={excursion.title} />
          <h3 className="route">Маршрут: {excursion.route}</h3>
          <div className="exc">
            <div className="exc__info">
              <FaIcons.FaClock className="exc__icon" />
              <p className="exc__title">
                Продолжительность: <b>{excursion.duration} ч.</b>
              </p>
            </div>
            <div className="exc__info">
              <FaIcons.FaHourglassStart className="exc__icon" />
              <p className="exc__title">
                Начало: <b>{excursion.start}</b>
              </p>
            </div>
            <div className="exc__info">
              <FaIcons.FaHourglassEnd className="exc__icon" />
              <p className="exc__title">
                Окончание: <b>{excursion.end}</b>
              </p>
            </div>
            <div className="exc__info">
              <FaIcons.FaDollarSign className="exc__icon" />
              <p className="exc__title">
                Стоимость: <b>{excursion.price}</b> руб.
              </p>
            </div>
          </div>
          <div className="included">
            <h3 className="included__title">Что включено:</h3>
            <ul className="included__list">
              {excursion.service.map((service) => (
                <li className="included__list-item" key={service.id}>
                  {service.name}
                </li>
              ))}
            </ul>
          </div>
          <p className="packages__description">{excursion.description}</p>
          <h3 className="closest">Ближайшие даты:</h3>
          <div className="dates">
            {excursion.availability.map(
              (availability) =>
                availability.initial_count - availability.sales_count > 0 && (
                  <div className="dates__info" key={availability.id}>
                    <span>
                      Дата: <b>{availability.date}</b>
                    </span>
                    <span>
                      Свободные места:
                      <b>
                        {availability.initial_count - availability.sales_count}
                      </b>
                    </span>
                  </div>
                ),
            )}
          </div>
          <Title title="Остались" addition="вопросы?" />
          <div className="contact-info">
            <FaIcons.FaPhone className="exc__icon" />
            <p className="exc__title">
              Просто позвоните по номеру: <b>8 800 333 55 66</b>
            </p>
          </div>
          <div className="packages__buttons">
            {user.isAuth ? (
              <Button
                buttonSize={'btn--large'}
                buttonColor={'btn--black'}
                onClick={() => setBookingFormVisible(true)}
              >
                Забронировать
              </Button>
            ) : (
              <Link to={LOGIN_ROUTE}>
                <Button buttonSize={'btn--large'} buttonColor={'btn--black'}>
                  Забронировать
                </Button>
              </Link>
            )}
            <Button buttonSize="btn btn--large" onClick={goBack}>
              Назад к поиску
            </Button>
          </div>
        </section>
        <ModalBooking
          isOpen={bookingFormVisible}
          setIsOpen={() => setBookingFormVisible(false)}
        />
      </main>
    </>
  )
}

export default ExcursionPage
