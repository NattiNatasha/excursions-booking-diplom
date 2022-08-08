import { Link } from 'react-router-dom'
import { Button } from '../../components/button/Button'
import mainVideo from '../../assets/video.mp4'
import { EXCURSIONS_ROUTE } from '../../utils/consts'
import './Home.scss'

const Home = () => {
  return (
    <div className="container">
      <section className="content">
        <h1 className="content__title">HOMLIN TRAVEL</h1>
        <p className="content__description">
          Самая полная коллекция экскурсий по Калининграду и области!
        </p>
        <Link to={EXCURSIONS_ROUTE}>
          <Button buttonSize="btn--large">ПОЕХАЛИ!</Button>
        </Link>
      </section>
      <video className="video__container" loop muted autoPlay>
        <source src={mainVideo} type="video/mp4" />
        <source src={mainVideo} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default Home
