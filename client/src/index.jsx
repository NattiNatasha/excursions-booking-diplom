import { useLayoutEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { createContext } from 'react'
import UserStore from './store/UserStore'
import ExcursionStore from './store/ExcursionStore'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
export const Context = createContext(null)

const Wrapper = ({ children }) => {
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])
  return children
}

root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      excursion: new ExcursionStore(),
    }}
  >
    <BrowserRouter>
      <Wrapper>
        <App />
      </Wrapper>
    </BrowserRouter>
  </Context.Provider>,
)
