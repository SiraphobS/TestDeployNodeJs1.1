// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

import { StartDateSearch, EndDateSearch } from './index'

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
}

// ** Table columns
export const columns = [
  {
    name: 'ลำดับ',
    minWidth: '50px',
    selector: 'id',
    sortable: true,
    maxWidth: '75px',
    cell: (row, index) => (index + 1)
  },
  {
    name: 'รหัสพนักงาน',
    minWidth: '50px',
    maxWidth: '125px',
    selector: 'id',
    cell: row => row["Salesperson Code"]
  },
  {
    name: 'ชื่อ-สกุล',
    minWidth: '164px',
    selector: 'invoiceStatus',
    cell: row => row["Name"]
  },
  {
    name: 'เบอร์',
    minWidth: '107px',
    selector: 'invoiceStatus',
    cell: row => row["Phone No_"]
  },
  {
    name: 'เป้า',
    minWidth: '127px',
    selector: 'invoiceStatus',
    cell: row => Intl.NumberFormat().format(Number(row["Target"]).toFixed(2))
  },
  {
    name: 'ยอดขายทั้งหมด',
    minWidth: '127px',
    selector: 'invoiceStatus',
    cell: row => Intl.NumberFormat().format(Number(row["Sum"]).toFixed(2))
  },
  {
    name: 'ค่าคอมมิชชั่น',
    minWidth: '127px',
    selector: 'invoiceStatus',
    cell: row => Intl.NumberFormat().format(Number(row["Commission"]).toFixed(2))
  },
  {
    name: '',
    minWidth: '50px',
    maxWidth: '100px',
    selector: '',
    sortable: true,
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        {/* <Send size={17} /> */}
        <Link to={{
          pathname:`/apps/sales/preview/${row["Salesperson Code"]}`, 
          state: `${row["Salesperson Code"]},${row["Name"]},${row["E-Mail"]},${row["Phone No_"]},${row["Job Title"]},${row["Target"]},${row["Sum"]},${row["Commission"]},${StartDateSearch},${EndDateSearch}`}}>
          <Eye size={17} className='mx-1' />
        </Link>
      </div>
    )
  }
]
