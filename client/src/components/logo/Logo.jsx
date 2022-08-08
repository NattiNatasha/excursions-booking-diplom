import { Link } from 'react-router-dom'
import '../../App.scss'
import './Logo.scss'

const Logo = () => {
  return (
    <Link to={'/'} className="logo">
      H&T
    </Link>
  )
}

export default Logo
