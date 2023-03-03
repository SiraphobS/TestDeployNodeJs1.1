import { lazy } from 'react'

const RegexConfigRoutes = [
  // Dashboards
  {
    path: '/regexConfig/list',
    component: lazy(() => import('../../views/apps/regexConfig/list'))
  }
]

export default RegexConfigRoutes
