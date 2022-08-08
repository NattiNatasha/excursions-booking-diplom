import { useNavigate } from 'react-router-dom'
import { Button } from '../button/Button'
import { EXCURSION_ROUTE } from '../../utils/consts'

const Excursion = ({ excursion }) => {
  let navigate = useNavigate()
  return (
    <div className="box">
      <div className="image">
        <img
          src={process.env.REACT_APP_API_URL + excursion.img}
          alt={excursion.id}
        />
      </div>
      <div className="box-wrapper">
        <div className="box__content">
          <h3 className="box__title">{excursion.title}</h3>
          <p className="box__price">{excursion.price} руб.</p>
          <p>{excursion.route}</p>
        </div>
        <div className="box__btn">
          <Button
            onClick={() => navigate(EXCURSION_ROUTE + '/' + excursion.id)}
          >
            Подробнее
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Excursion
