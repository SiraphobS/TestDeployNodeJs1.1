import mock from './mock'
import './navbar/navbarSearch'
import './apps/invoice'
import './pages/account-settings'
import './jwt'

mock.onAny().passThrough()
