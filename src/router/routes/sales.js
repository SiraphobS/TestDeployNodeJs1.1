import { lazy } from 'react'

const SalesRoutes = [
  // Sales index
  {
    path: '/sales',
    component: lazy(() => import('../../views/sales')),
    exact: true
  },
  {
    path: '/sales/preview/:id',
    component: lazy(() => import('../../views/sales/preview')),
    meta: {
      navLink: '/sales/preview'
    }
  }
]

export default SalesRoutes
