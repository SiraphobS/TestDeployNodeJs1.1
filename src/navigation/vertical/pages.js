import { FileText, Circle } from 'react-feather'
export default [
  {
    id: 'pages',
    title: 'Pages',
    icon: <FileText size={20} />,
    children: [
      {
        id: 'accountSettings',
        title: 'Account Settings',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/account-settings'
      },
      {
        id: 'miscellaneous',
        title: 'Miscellaneous',
        icon: <Circle size={12} />,
        children: [
          {
            id: 'notAuthorized',
            title: 'Not Authorized',
            permissions: ['admin', 'editor'],
            navLink: '/misc/not-authorized',
            newTab: true
          },
          {
            id: 'error',
            title: 'Error',
            permissions: ['admin', 'editor'],
            navLink: '/misc/error',
            newTab: true
          }
        ]
      },
      {
        id: 'home',
        title: 'HOME',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/testhome'
      }
    ]
  }
]
