import { lazy } from 'react'

const PayRollRoute = [
  {
    path: '/payroll',
    component: lazy(() => import('../../views/payroll')),
    exact: true
  }
]

export default PayRollRoute
