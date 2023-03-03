// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

import Moment from 'moment'

import commaNumber from 'comma-number'

import { StartDateSearch, EndDateSearch } from './index'

// ** Third Party Components
import { CardText, Badge, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
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
    maxWidth: '60px',
    cell: row => row["Row_number"]
  },
  {
    name: 'วันที่เอกสาร',
    selector: 'id',
    cell: row => Moment(row["Document Date"]).format('YYYY-MM-DD')
  },
  {
    name: 'ประเภทเอกสาร',
    selector: 'invoiceStatus',
    cell: row => row["Document Type"]
  },
  {
    name: 'หมายเลขเอกสาร',
    selector: 'invoiceStatus',
    cell: row => row["Document No_"]
  },
  {
    name: 'รหัสลูกค้า',
    selector: 'invoiceStatus',
    cell: row => row["Customer No_"]
  },
  {
    name: 'ราคาไม่รวม VAT',
    selector: 'invoiceStatus',
    cell: row => (
      <div>
        <CardText className='mb-25'>{commaNumber(Number(row["Sales (LCY)"]).toFixed(2))}</CardText>
      </div>
    )
  },
  {
    name: 'ราคารวม VAT',
    selector: 'invoiceStatus',
    cell: row => (
      <div>
        <CardText className='mb-25'>{commaNumber(Number(row["Sales+Vat"]).toFixed(2))}</CardText>
      </div>
    )
  },
  {
    name: 'ยอดคงเหลือ',
    selector: 'invoiceStatus',
    cell: row => (
      <div>
        <CardText className='mb-25'>{commaNumber(Number(row["Remaining Amount"]).toFixed(2))}</CardText>
      </div>
    )
  },
  {
    name: 'ค่าคอมมิชชั่น',
    selector: 'invoiceStatus',
    cell: row => (
      <div>
        <CardText className='mb-25'>{commaNumber(Number(row["Commission"]).toFixed(2))}</CardText>
      </div>
    )
  },
  {
    name: 'โบนัส',
    selector: 'invoiceStatus',
    cell: row => (
      <div>
        <CardText className='mb-25'>{commaNumber(Number(row["Bouns"]).toFixed(2))}</CardText>
      </div>
    )
  },
  {
    name: 'PayMent Type',
    selector: 'invoiceStatus',
    cell: row => (
      <div>
        <CardText className='mb-25'>{row["PayMent Type"]}</CardText>
      </div>
    )
  },
  {
    name: 'PayMent Date',
    selector: 'invoiceStatus',
    cell: row => (
      <div>
        <CardText className='mb-25'>{Moment(row["PayMent_Date"]).format('YYYY-MM-DD')}</CardText>
      </div>
    )
  }
]
