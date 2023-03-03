// ** Routes Imports
import HomeRoutes from './Home'
import AppRoutes from './Apps'
import PagesRoutes from './Pages'
import RegexConfigRoutes from './RegexConfig'
import StoreRoutes from './store'
import SalesRoutes from './sales'
import StockOnlineRoute from './StockOnline'
import SerialNoRoute from './SerialNo'
import Warehouse from './Warehouse'
import PayRollRoute from './PayRoll'
import PowerBiRoute from './PowerBi'

// ** Document title
const TemplateTitle = '%s - VivaPerfect Website'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  ...HomeRoutes,
  ...AppRoutes,
  ...PagesRoutes,
  ...RegexConfigRoutes,
  ...StoreRoutes,
  ...SalesRoutes,
  ...StockOnlineRoute,
  ...SerialNoRoute,
  ...Warehouse,
  ...PayRollRoute,
  ...PowerBiRoute
]

export { DefaultRoute, TemplateTitle, Routes }
