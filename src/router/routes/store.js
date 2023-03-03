import { lazy } from 'react'

const StoreRoutes = [
  // Store
  {
    path: '/store',
    component: lazy(() => import('../../views/store')),
    exact: true
  }
]

export default StoreRoutes
