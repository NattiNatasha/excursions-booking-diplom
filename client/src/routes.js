import Auth from './pages/auth/Auth'
import Reg from './pages/reg/Reg'
import About from './pages/about/About'
import Admin from './pages/admin/Admin'
import ExcursionPage from './pages/excursionpage/ExcursionPage'
import Excursions from './pages/excursions/Excursions'
import MyBookings from './pages/mybookings/MyBookings'
import NotFound from './pages/notfound/NotFound'
import {
  ABOUT_ROUTE,
  ADMIN_ROUTE,
  EXCURSIONS_ROUTE,
  EXCURSION_ROUTE,
  LOGIN_ROUTE,
  MYBOOKINGS_ROUTE,
  NOTFOUND_ROUTE,
  REGISTRATION_ROUTE,
} from './utils/consts'

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    element: <Admin />,
  },
]

export const authRoutes = [
  {
    path: MYBOOKINGS_ROUTE,
    element: <MyBookings />,
  },
]

export const publicRoutes = [
  {
    path: ABOUT_ROUTE,
    element: <About />,
  },
  {
    path: EXCURSIONS_ROUTE,
    element: <Excursions />,
  },
  {
    path: EXCURSION_ROUTE + '/:id',
    element: <ExcursionPage />,
  },
  {
    path: LOGIN_ROUTE,
    element: <Auth />,
  },
  {
    path: REGISTRATION_ROUTE,
    element: <Reg />,
  },
  {
    path: NOTFOUND_ROUTE,
    element: <NotFound />,
  },
]
