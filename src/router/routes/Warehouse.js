import { lazy } from 'react'

const WarehouseRoute = [
  {
    path: '/report/warehouse',
    component: lazy(() => import('../../views/report/warehouse')),
    exact: true
  }
]

export default WarehouseRoute
