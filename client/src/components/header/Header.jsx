import { Link } from 'react-router-dom'
import { useState, useRef, useEffect, useContext } from 'react'
import { Button } from '../button/Button'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import Logo from '../logo/Logo'
import { SidebarData } from './SidebarData'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import './Header.scss'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts'

const Header = observer(() => {
  const { user } = useContext(Context)
  const [click, setClick] = useState(false)
  const menuRef = useRef()

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    user.setIsAdmin(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.path.includes(menuRef.current)) {
        closeMobileMenu()
      }
    }
    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.addEventListener('click', handleClickOutside)
  }, [])

  return (
    <header className="header">
      <div ref={menuRef} className="header__left">
        <div className="header__left-icon" onClick={handleClick}>
          {click ? (
            <AiIcons.AiOutlineClose className="burger-close" />
          ) : (
            <FaIcons.FaBars className="burger-bars" />
          )}
        </div>
        <Logo />
        <ul
          className={click ? 'header__left-list active' : 'header__left-list'}
        >
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link
                  to={item.path}
                  className="header__left-link"
                  onClick={closeMobileMenu}
                >
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      {user.isAuth ? (
        <div className="header__right">
          <Link to={LOGIN_ROUTE}>
            <Button buttonSize={'btn--medium'} onClick={logOut}>
              Выйти
            </Button>
          </Link>
        </div>
      ) : (
        <div className="header__right">
          <Link to={LOGIN_ROUTE}>
            <Button buttonSize={'btn--medium'}>Вход</Button>
          </Link>
          <Link to={REGISTRATION_ROUTE}>
            <Button buttonSize="btn btn--medium">Регистрация</Button>
          </Link>
        </div>
      )}
    </header>
  )
})
export default Header
