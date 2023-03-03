import { lazy } from 'react'

const StockOnlineRoute = [
  {
    path: '/stockonline',
    component: lazy(() => import('../../views/stockonline')),
    exact: true
  }
]

export default StockOnlineRoute
