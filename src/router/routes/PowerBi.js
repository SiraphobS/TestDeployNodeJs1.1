import { lazy } from 'react'

const PowerBiRoute = [
  {
    path: '/powerbi',
    component: lazy(() => import('../../views/power-bi')),
    exact: true
  }
]

export default PowerBiRoute
