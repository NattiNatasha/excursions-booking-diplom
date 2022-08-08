import { useContext, useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import { adminRoutes, authRoutes, publicRoutes } from './routes'
import Layout from './Layout'
import Home from './pages/home/Home'
import { observer } from 'mobx-react-lite'
import { Context } from './index'
import { check } from './http/UserApi'
import Preloader from './components/preloader/Preloader'

const App = observer(() => {
  const { user } = useContext(Context)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(true)
        user.setIsAuth(true)
      })
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <Preloader />
  }
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {user.isAuth &&
            user.isAdmin &&
            adminRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          {user.isAuth &&
            authRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </div>
  )
})

export default App
