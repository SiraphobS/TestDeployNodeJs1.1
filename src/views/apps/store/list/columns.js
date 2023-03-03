// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import {
  Eye,
  TrendingUp,
  Send,
  MoreVertical,
  Download,
  Edit,
  Trash,
  Copy,
  CheckCircle,
  Save,
  ArrowDownCircle,
  Info,
  PieChart
} from 'react-feather'

// ** Vars
const invoiceStatusObj = {
  Sent: { color: 'light-secondary', icon: Send },
  Paid: { color: 'light-success', icon: CheckCircle },
  Draft: { color: 'light-primary', icon: Save },
  Downloaded: { color: 'light-info', icon: ArrowDownCircle },
  'Past Due': { color: 'light-danger', icon: Info },
  'Partial Payment': { color: 'light-warning', icon: PieChart }
}

// ** renders client column
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

  // if (row.avatar.length) {
  //   return <Avatar className='mr-50' img={row.avatar} width='32' height='32' />
  // } else {
  //   return <Avatar color={color} className='mr-50' content={row.client ? row.client.name : 'John Doe'} initials />
  // }
}

// ** Table columns
export const columns = [
  {
    name: 'Itme No',
    minWidth: '107px',
    selector: 'id',
    cell: row => row["Item No_"]
  },
  {
    name: 'Description',
    minWidth: '164px',
    selector: 'invoiceStatus',
    cell: row => row.Description
  },
  {
    name: 'Quantity',
    minWidth: '107px',
    selector: 'invoiceStatus',
    cell: row => row.qty
  }
]
