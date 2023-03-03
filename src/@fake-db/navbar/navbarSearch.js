import mock from '../mock'

export const searchArr = [
  {
    groupTitle: 'Pages',
    searchLimit: 4,
    data: [
      {
        id: 7,
        target: 'invoiceList',
        isBookmarked: false,
        title: 'Invoice List',
        icon: 'List',
        link: '/apps/invoice/list'
      },
      {
        id: 8,
        target: 'invoicePreview',
        isBookmarked: false,
        title: 'Invoice Preview',
        icon: 'FileText',
        link: '/apps/invoice/preview'
      },
      {
        id: 9,
        target: 'invoiceEdit',
        isBookmarked: false,
        title: 'Invoice Edit',
        icon: 'Edit',
        link: '/apps/invoice/edit'
      },
      {
        id: 10,
        target: 'invoiceAdd',
        isBookmarked: false,
        title: 'Invoice Add',
        icon: 'Plus',
        link: '/apps/invoice/add'
      },
      {
        id: 26,
        target: 'accountSettings',
        isBookmarked: false,
        title: 'Account Settings',
        icon: 'Settings',
        link: '/pages/account-settings'
      },

      {
        id: 35,
        target: 'notAuthorized',
        isBookmarked: false,
        title: 'Not Authorized Page',
        icon: 'UserX',
        link: '/misc/not-authorized'
      },
      {
        id: 37,
        target: 'error',
        isBookmarked: false,
        title: 'Error',
        icon: 'AlertTriangle',
        link: '/misc/error'
      }
    ]
  },
  {
    groupTitle: 'Files',
    searchLimit: 4,
    data: [
      {
        title: 'Passport Image',
        by: 'Oliver Queen',
        size: '52kb',
        file: require('@src/assets/images/icons/jpg.png').default
      },
      {
        title: 'Parenting Guide',
        by: 'Alfred Pennyworth',
        size: '2.3mb',
        file: require('@src/assets/images/icons/doc.png').default
      },
      {
        title: 'Class Notes',
        by: 'Barry Allen',
        size: '30kb',
        file: require('@src/assets/images/icons/doc.png').default
      },
      {
        title: 'Class Attendance',
        by: 'Walter White',
        size: '52mb',
        file: require('@src/assets/images/icons/xls.png').default
      }
    ]
  },
  {
    groupTitle: 'Contacts',
    searchLimit: 4,
    data: [
      {
        title: 'Mia Davis',
        email: 'miadavis@teleworm.us',
        img: require('@src/assets/images/portrait/small/avatar-s-8.jpg').default,
        date: '01/03/2020'
      },
      {
        title: 'Norris Carrière',
        email: 'NorrisCarriere@rhyta.com',
        img: require('@src/assets/images/portrait/small/avatar-s-3.jpg').default,
        date: '07/03/2020'
      },
      {
        title: 'Charlotte Gordon',
        email: 'CharlotteGordon@jourrapide.com',
        img: require('@src/assets/images/portrait/small/avatar-s-26.jpg').default,
        date: '14/03/2020'
      },
      {
        title: 'Robert Nash',
        email: 'RobertNash@dayrep.com',
        img: require('@src/assets/images/portrait/small/avatar-s-25.jpg').default,
        date: '21/03/2020'
      }
    ]
  }
]

// GET Search Data
mock.onGet('/api/main-search/data').reply(config => {
  return [200, { searchArr }]
})

// GET Search Data & Bookmarks
mock.onGet('/api/bookmarks/data').reply(config => {
  const bookmarks = searchArr[0].data.filter(item => item.isBookmarked)
  const suggestions = searchArr[0].data
  return [200, { suggestions, bookmarks }]
})

// POST Update isBookmarked
mock.onPost('/api/bookmarks/update').reply(config => {
  const { id } = JSON.parse(config.data)

  const obj = searchArr[0].data.find(item => item.id === id)

  Object.assign(obj, { isBookmarked: !obj.isBookmarked })

  return [200]
})
