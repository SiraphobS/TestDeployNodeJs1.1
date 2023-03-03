// ** React Imports
import { useState, useEffect, forwardRef, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'

import Flatpickr from 'react-flatpickr'
import axios from 'axios'

import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Table Columns
import { columns } from './columns'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Button, Label, Input, CustomInput, Row, Col, Card, CardText } from 'reactstrap'

// ** Store & Actions
import { getData_sales_Line } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import Moment from 'moment'

import ExpandableTable, { data, columns1 } from '../com-line-item/data'

import logo from '@src/assets/images/logo/logo_TRW.jpg' // with import

import XLSX from 'xlsx'

import commaNumber from 'comma-number'

import { isUserLoggedIn } from '@utils'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const CustomHeader = ({ Data, dataSales, handlesubmit, handleExport, handleFilter, value, handleStatusValue, statusValue, handlePerPage, rowsPerPage, ClickButtonSearch, ClickButtonClean, stratDatepicker, setstratDatepicker, endDatepicker, setendDatepicker }) => {
  const startDate = Moment(dataSales.length > 13 ? dataSales[9] : dataSales[8])
  const timeEnd = Moment(dataSales.length > 13 ? dataSales[10] : dataSales[9])
  const diff = timeEnd.diff(startDate)
  const diffDuration = Moment.duration(diff)
  const history = useHistory()
  console.log(dataSales)
  return (
    <div className='justify-content-between flex-md-row flex-column invoice-spacing mt-0' style={{width:"100%"}}>
      <div>
        {/* <div style={{paddingTop:"5px", paddingBottom:"10px"}}>
          <Button color='primary' outline onClick={() => history.goBack()}> {`<-`} Back </Button>
        </div> */}
        <div className='logo-wrapper'>
          <img style={{width:"300px"}} src={logo} />
        </div>
        <div className='d-flex justify-content-between flex-md-row flex-column'>
          <div style={{width:"100%", fontWeight:"bold", textAlign:"center", fontSize:"18px"}}>
            <CardText className='mb-25'>สรุปรายละเอียดช่วงวันที่ {dataSales.length > 13 ? `${dataSales[9]} ถึง ${dataSales[10]} ${diffDuration.months() + 1 === 3 ? `(1 ไตรมาส)` : `${diffDuration.months() + 1 === 6 ? `(2 ไตรมาส)` : `${diffDuration.months() + 1 === 9 ? `(3 ไตรมาส)` : `${diffDuration.months() + 1 === 12 ? `(4 ไตรมาส)` : `(${diffDuration.months() + 1} เดือน)`}`}`}`}` : `${dataSales[8]} ถึง ${dataSales[9]} ${diffDuration.months() + 1 === 3 ? `(1 ไตรมาส)` : `${diffDuration.months() + 1 === 6 ? `(2 ไตรมาส)` : `${diffDuration.months() + 1 === 9 ? `(3 ไตรมาส)` : `${diffDuration.months() + 1 === 12 ? `(4 ไตรมาส)` : `(${diffDuration.months() + 1} เดือน)`}`}`}`}`}</CardText>
          </div>
        </div>
        <div className='d-flex justify-content-between flex-md-row flex-column'>
          <div style={{width:"25%", fontWeight:"bold"}}>
            <CardText className='mb-25'>ข้อมูลพนักงานขาย</CardText>
          </div>
          <div style={{width:"30%", fontWeight:"bold"}}>
          </div>
          <div style={{width:"20%", fontWeight:"bold"}}>
            <CardText className='mb-25'>ข้อมูลการขาย</CardText>
          </div>
          <div style={{width:"10%", justifyContent: 'flex-end', textAlign:"end"}}>
          </div>
        </div>
        <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
          <div style={{width:"35%", paddingLeft:"20px"}}>
            <CardText className='mb-25'>ชื่อ-นามสกุลพนักงาน : {dataSales[1]}</CardText>
            <CardText className='mb-25'>รหัสพนักงาน : {dataSales[0]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ตำแหน่งพนักงาน : {dataSales.length > 13 ? `${dataSales[5]}` : `${dataSales[4]}`}</CardText>
            <CardText className='mb-25'>เบอร์โทรศัพท์ : {dataSales.length > 13 ? `${dataSales[3]}, ${dataSales[4]}` : `${dataSales[3]}`}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E-Mail : {dataSales[2]}</CardText>
          </div>
          <div style={{width:"30%"}}>
          </div>
          <div style={{width:"25%", paddingLeft:"20px"}}>
            <CardText className='mb-25'>{dataSales.length > 13 ? `${dataSales[6] !== '0' ? `เป้า ${commaNumber(Number(dataSales[6]).toFixed(2))} บาท` : ``}` : `${dataSales[5] !== '0' ? `เป้า ${commaNumber(Number(dataSales[5]).toFixed(2))} บาท` : ``}`}</CardText>
            <CardText className='mb-25'>{dataSales.length > 13 ? `${dataSales[11] !== '0' ? `เป้าโบนัส ${commaNumber(Number(dataSales[11]).toFixed(2))} บาท` : ``}` : `${dataSales[10] !== '0' ? `เป้าโบนัส ${commaNumber(Number(dataSales[10]).toFixed(2))} บาท` : ``}`}</CardText>
            <CardText className='mb-25'>{dataSales.length > 13 ? `ยอดขายทั้งหมด ${commaNumber(Number(dataSales[7]).toFixed(2))} บาท` : `ยอดขายทั้งหมด ${commaNumber(Number(dataSales[6]).toFixed(2))} บาท`}</CardText>
            <CardText className='mb-25'>{dataSales.length > 13 ? `ค่าคอมมิชชั่น ${commaNumber(Number(dataSales[8]).toFixed(2))} บาท` : `ค่าคอมมิชชั่น ${commaNumber(Number(dataSales[7]).toFixed(2))} บาท`}</CardText>
            <CardText className='mb-25'>{dataSales.length > 13 ? `${dataSales[12] !== '0' ? `โบนัส ${commaNumber(Number(dataSales[12]).toFixed(2))} บาท` : ``}` : `${dataSales[11] !== '0' ? `โบนัส ${commaNumber(Number(dataSales[11]).toFixed(2))} บาท` : ``}`}</CardText>
          </div>
          <div style={{width:"10%", justifyContent: 'flex-end', textAlign:"end"}}>
            <Button color='success' style={{width:"90%"}} onClick={() => handleExport()}>Export</Button>
            <CardText className='mb-25'></CardText>
            <Button color='primary' style={{width:"90%"}} onClick={() => handlesubmit()}>Submit</Button>
            <CardText className='mb-25'>หน่วย:บาท</CardText>
          </div>
        </div>
      </div>
    </div>
  )
}

const SalesComLine = ({ Data, dataSales }) => {
  const dispatchComLine = useDispatch()
  const store = useSelector(state => state.invoice)

  const [value, setValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [modal, setModal] = useState(false)
  const [dataToExport, setDataToExport] = useState([])
  const [dataToSubmit, setDataToSubmit] = useState([])

  const toggleModal = () => {
    setModal(!modal)
  }

  const handleFilter = val => {
    setValue(val)
  }

  const handlePerPage = e => {
    dispatchComLine(
        getData_sales_Line({
        page: currentPage,
        perPage: parseInt(e.target.value),
        status: statusValue,
        q: value
      })
    )
    setRowsPerPage(parseInt(e.target.value))
  }

  const handleStatusValue = e => {
    setStatusValue(e.target.value)
    dispatchComLine(
        getData_sales_Line({
        page: currentPage,
        perPage: rowsPerPage,
        status: e.target.value,
        q: value
      })
    )
  }

  useEffect(() => {
    dispatchComLine(
      getData_sales_Line({
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue,
        q: value,
        data: Data
      })
    )
  }, [dispatchComLine])

  const handlePagination = page => {
    dispatchComLine(
        getData_sales_Line({
        page: page.selected + 1,
        perPage: rowsPerPage,
        status: statusValue,
        q: value,
        data: Data
      })
    )
    setCurrentPage(page.selected + 1)
  }

  const CustomPagination = () => {
    const count = Number((store.total / rowsPerPage).toFixed(0))

    return (
      <ReactPaginate
        pageCount={count || 1}
        nextLabel=''
        breakLabel='...'
        previousLabel=''
        activeClassName='active'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1'}
      />
    )
  }

  const dataToRender = () => {
    const filters = {
      status: statusValue,
      q: value
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      //return store.allData.slice(0, rowsPerPage)
    }
  }

  const handleExport = () => {
    console.log(store.allData)
    const name = `commission_${dataSales[0]}_${dataSales.length > 13 ? `${Moment(dataSales[9]).format('YYYYMMDD')}_${Moment(dataSales[10]).format('YYYYMMDD')}` : `${Moment(dataSales[8]).format('YYYYMMDD')}_${Moment(dataSales[9]).format('YYYYMMDD')}`}.xlsx`
    const wb = XLSX.utils.json_to_sheet(store.allData)
    const wbout = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wbout, wb, 'Sheet')
    XLSX.writeFile(wbout, name)
    toggleModal()
  }

  // ** State
  const [userData, setUserData] = useState(null)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  const MySwal = withReactContent(Swal)

  const handleHTMLAlert = () => {
    window.location.reload()
  }

  const handlesubmit = () => {
    console.log(dataToSubmit)
    const user = userData['Firstname']
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/CommissionPaid`, { dataToSubmit, user }).then(response => {
      if (response.data !== '') {
        return MySwal.fire({
          title: response.data[0].Result,
          confirmButtonText: (
            <Button color='primary' textColor='while' onClick={handleHTMLAlert}>OK</Button>
          ),
          customClass: {
            confirmButton: 'btn btn'
          },
          buttonsStyling: false
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
    
  }

  const handleSelect = (event) => {
    console.log('test')
    console.log(event.selectedRows)
    setDataToSubmit(event.selectedRows)
  }
  
  const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
    <div className='custom-control custom-checkbox'>
      <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
      <label className='custom-control-label' onClick={onClick} />
    </div>
  ))

  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <div className='invoice-list-dataTable'>
          <DataTable
            selectableRows
            selectableRowsComponent={BootstrapCheckbox}
            onSelectedRowsChange={handleSelect}
            noHeader
            pagination
            paginationServer
            subHeader={true}
            columns={columns}
            responsive={true}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='invoiceId'
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            data={dataToRender()}
            expandableRows
            expandOnRowClicked
            expandableRowsComponent={<ExpandableTable />}
            subHeaderComponent={
              <CustomHeader
                Data={Data}
                dataSales={dataSales}
                value={value}
                statusValue={statusValue}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                handleStatusValue={handleStatusValue}
                handleExport={handleExport}
                handlesubmit={handlesubmit}
              />
            }
          />
        </div>
      </Card>
    </div>
  )
}

export default SalesComLine
