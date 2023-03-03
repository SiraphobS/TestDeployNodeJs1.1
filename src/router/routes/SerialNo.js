import { lazy } from 'react'

const SerialNoRoute = [
  {
    path: '/serialno',
    component: lazy(() => import('../../views/serialno')),
    exact: true
  }
]

export default SerialNoRoute
