import { Crosshair } from 'react-feather'

export default [
  {
    id: 'api',
    title: 'API',
    icon: <Crosshair size={20} />,
    badge: 'light-warning',
    children:[
      {
        id: 'stockOnline',
        title: 'Stock Online',
        navLink: '/stockonline'
      },
      {
        id: 'serialNo',
        title: 'Serial Number',
        navLink: '/serialno'
      }
    ]
  }
]
