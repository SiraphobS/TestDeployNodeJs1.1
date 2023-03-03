// ** Router Import
import Router from './router/Router'
import Moment from 'moment'

const App = props => <Router />
export const version = `1.1.0-frontend-${Moment(Date()).format('YYYYMMDD')}`

export default App
