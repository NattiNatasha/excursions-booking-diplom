import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { ADMIN_ROUTE, EXCURSIONS_ROUTE } from '../../utils/consts'
import { login } from '../../http/UserApi'
import { Context } from '../../index'
import { Button } from '../../components/button/Button'
import FormInput from '../../components/forminput/FormInput'
import './Auth.scss'

const Auth = observer(() => {
  const { user } = useContext(Context)
  let navigate = useNavigate()
  const goBack = () => navigate(-1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const logIn = async () => {
    try {
      let data
      data = await login(email, password)
      user.setUser(user)
      user.setIsAuth(true)
      if (email === 'admin@yandex.ru') {
        user.setIsAdmin(true)
        navigate(ADMIN_ROUTE)
      } else {
        navigate(EXCURSIONS_ROUTE)
      }
    } catch (e) {
      alert(e.response.data.message)
    }
  }
  return (
    <>
      <div className="auth-page">
        <h1 className="auth-page__title">Вход</h1>
        <form>
          <FormInput
            type="e-mail"
            placeholder="e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            placeholder={'Пароль'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            buttonSize={'btn--xl'}
            buttonColor={'btn--black'}
            onClick={logIn}
          >
            ВОЙТИ
          </Button>
        </form>
      </div>
    </>
  )
})

export default Auth
