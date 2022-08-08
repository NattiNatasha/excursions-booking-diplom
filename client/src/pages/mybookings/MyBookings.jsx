import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchBookings } from '../../http/ExcursionApi'
import Title from '../../components/title/Title'
import { Button } from '../../components/button/Button'
import { EXCURSIONS_ROUTE } from '../../utils/consts'
import jwt_decode from 'jwt-decode'

import './MyBookings.scss'

const MyBookings = () => {
  const [booking, setBooking] = useState([])
  useEffect(() => {
    fetchBookings(user.id).then((data) => setBooking(data))
  }, [])

  console.log(booking)

  const getUserData = () => {
    const currentUser = localStorage.getItem('token')
    return jwt_decode(currentUser)
  }
  const user = getUserData()

  return (
    <main className="auth-page">
      {booking.length > 0 ? (
        <div className="page-container">
          <Title title="Мои" addition="заказы" />

          <table className="table">
            <thead>
              <tr>
                <th>№ заказа</th>
                <th>Название тура</th>
                <th>Дата</th>
                <th>Кол-во человек</th>
                <th>Сумма</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.excursion_name}</td>
                  <td>{item.date}</td>
                  <td>{item.tourists_quantity}</td>
                  <td>{item.amount} руб.</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="page-container">
          <Title title="Мои" addition="заказы" />
          <h2 className="no-orders__title">Пока нет заказов:(</h2>
          <div className="no-orders__img">
            <img
              src="https://cdn4.iconfinder.com/data/icons/yellow-cats-social-life/128/sad-128.png"
              alt="нет заявок"
            />
            <Link to={EXCURSIONS_ROUTE}>
              <Button buttonColor={'btn--black'}>ЗАКАЗАТЬ ЭКСКУРСИЮ</Button>
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}

export default MyBookings
