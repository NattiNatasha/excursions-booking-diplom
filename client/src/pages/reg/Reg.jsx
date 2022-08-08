import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/button/Button'
import FormInput from '../../components/forminput/FormInput'
import { observer } from 'mobx-react-lite'
import { EXCURSIONS_ROUTE } from '../../utils/consts'
import { registration } from '../../http/UserApi'
import { Context } from '../../index'

const Reg = observer(() => {
  const { user } = useContext(Context)
  let navigate = useNavigate()
  const [first_name, setFirstname] = useState('')
  const [surname, setSurname] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = async () => {
    let data
    try {
      data = await registration(first_name, surname, phone, email, password)
      user.setUser(user)
      user.setIsAuth(true)
      navigate(EXCURSIONS_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }
  }
  return (
    <>
      <div className="auth-page">
        <h1 className="auth__title">Регистрация</h1>
        <form>
          <FormInput
            type="text"
            placeholder={'Имя'}
            value={first_name}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <FormInput
            type="text"
            placeholder={'Фамилия'}
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <FormInput
            type="phone"
            placeholder={'Телефон'}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <FormInput
            type="e-mail"
            placeholder={'e-mail'}
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
            onClick={signIn}
          >
            ЗАРЕГИСТРИРОВАТЬСЯ
          </Button>
        </form>
      </div>
    </>
  )
})

export default Reg
