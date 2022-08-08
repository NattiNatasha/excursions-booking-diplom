import './Footer.scss'

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__desc">Homlin Travel @All rights reserved</p>
      <p className="footer__desc">{new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer
