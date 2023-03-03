// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

import Moment from 'moment'

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
    name: 'ลำดับที่',
    minWidth: '107px',
    selector: 'id',
    cell: row => row.No_
    //cell: (row, index) => index + 1
  },
  {
    name: 'เลขที่ใบวางบิล',
    minWidth: '164px',
    selector: 'invoiceStatus',
    cell: row => row["Bill Collector"] + row["Pre-Assigned No_"]
  },
  {
    name: 'รหัสลูกค้า',
    minWidth: '107px',
    selector: 'invoiceStatus',
    cell: row => row["Customer No_"]
  },
  {
    name: 'ชื่อลูกค้า',
    minWidth: '350px',
    selector: 'client',
    sortable: true,
    cell: row => {
      const name = row ? row.Name : 'John Doe'
      return (
        <div className='d-flex justify-content-left align-items-center'>
          {renderClient(row)}
          <div className='d-flex flex-column'>
            <h6 className='user-name text-truncate mb-0'>{name}</h6>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Issued Date',
    selector: 'dueDate',
    sortable: true,
    minWidth: '180px',
    cell: row => Moment(row["Posting Date"]).format('YYYY-MM-DD')
  },
  {
    name: 'ยอดชำระ',
    selector: 'balance',
    sortable: true,
    minWidth: '164px',
    cell: row => {
      return Number(row["Original Amount"]).toFixed(2) !== 0 ? (
        <span>{Number(row["Original Amount"]).toFixed(2)}</span>
      ) : (
        <Badge color='light-success' pill>
          Paid
        </Badge>
      )
    }
  },
  {
    name: '',
    minWidth: '110px',
    selector: '',
    sortable: true,
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        {/* <Send size={17} /> */}
        <Link to={`/apps/invoice/preview/${row.No_}`}>
          <Eye size={17} className='mx-1' />
        </Link>
        {/* <UncontrolledDropdown>
          <DropdownToggle tag='span'>
            <MoreVertical size={17} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Download size={14} className='mr-50' />
              <span className='align-middle'>Download</span>
            </DropdownItem>
            <DropdownItem tag={Link} to={`/apps/invoice/edit/${row.id}`} className='w-100'>
              <Edit size={14} className='mr-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Trash size={14} className='mr-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Copy size={14} className='mr-50' />
              <span className='align-middle'>Duplicate</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> */}
      </div>
    )
  }
]
