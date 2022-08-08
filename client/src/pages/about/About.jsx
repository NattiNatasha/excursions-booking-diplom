import about from '../../assets/img/about-img.jpg'
import Title from '../../components/title/Title'
import { aboutData } from './aboutData'
import './About.scss'

const About = () => {
  return (
    <>
      <main className="page">
        <section className="about">
          <Title title="Кто" addition="мы?" />
          <div className="about__content">
            <img className="about__img" src={about} alt="о нас" />
            <div>
              <p className="about__desc">
                <b>HOMLIN TRAVEL</b> существует на рынке уже много лет. За более
                чем десять лет успешной работы в сфере внутреннего туризма, мы
                вырастили квалифицированных специалистов и у нас завязались не
                только деловые, но и дружеские отношения с гостиницами,
                ресторанами, музеями и другими организациями, что позволяет
                гарантировать высокое качество обслуживания Ваших туристов на
                самых выгодных для Вас условиях. Наличие собственного транспорта
                выгодно отражается на стоимости приобретаемого туристического
                продукта.
              </p>
              <p className="about__desc">
                Наша компания является признанным организациями-партнерами
                лидером продаж на протяжении последних нескольких лет.
              </p>
              <p className="about__desc">
                <b>HOMLIN TRAVEL</b> принимает участие во всевозможных
                туристических выставках, благотворительных мероприятиях и др.
              </p>
            </div>
          </div>
        </section>

        <section className="services" id="services">
          <Title title="Наши" addition="преимущества" />

          <div className="box-container">
            {aboutData.map((item, index) => {
              return (
                <div className="box" key={index}>
                  <div className="box-top">
                    <span>{item.number}</span>
                    <b className="box-top__icon">{item.image}</b>
                  </div>
                  <h3>{item.heading}</h3>
                  <p>{item.desc}</p>
                </div>
              )
            })}
          </div>
        </section>
      </main>
    </>
  )
}

export default About
