import { lazy } from 'react'

const HomeRoutes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/home')),
    exact: true
  }
]

export default HomeRoutes
