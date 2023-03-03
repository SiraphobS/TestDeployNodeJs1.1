import { PieChart } from 'react-feather'

export default [
  {
    id: 'report',
    title: 'Report',
    icon: <PieChart size={20} />,
    badge: 'light-warning',
    children:[
      {
        id: 'Warehouse',
        title: 'Warehouse',
        navLink: '/report/warehouse'
      }
    ]
  }
]
