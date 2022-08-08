import { Link } from 'react-router-dom'
import { Button } from '../../components/button/Button'
import './NotFound.scss'

const NotFound = () => {
  return (
    <div className="container nf">
      <main className="content">
        <h1 className="nf__title">404</h1>
        <p className="nf__text">Запрашиваемая страница не найдена</p>
        <Link to="/">
          <Button buttonSize="btn--large" buttonColor="btn--black">
            Вернуться на главную
          </Button>
        </Link>
      </main>
    </div>
  )
}

export default NotFound
