// ** React Imports
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Flatpickr from 'react-flatpickr'
import axios from 'axios'

import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Table Columns
import { columns } from './columns'

import Select from 'react-select'
import { selectThemeColors } from '@utils'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Button, Label, Input, CustomInput, Row, Col, Card, CardText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

// ** Store & Actions
import { getData_sales } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import Moment from 'moment'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export let StartDateSearch = ''
export let EndDateSearch = ''

const colourOptions = [
  { value: '0', label: 'กรุณาเลือกประเภทพนักงาน' },
  { value: '1', label: 'Sales กรุงเทพฯ' },
  { value: '2', label: 'Sales ต่างจังหวัด' },
  { value: '3', label: 'Sales โรงงาน' }
]

const SalesList = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.invoice)

  const [value, setValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [stratDatepicker, setstratDatepicker] = useState(new Date())
  const [endDatepicker, setendDatepicker] = useState(new Date())
  const [selected, setSelected] = useState('')

  const MySwal = withReactContent(Swal)

  const handleHTMLAlert = () => {
    window.location.reload()
  }

  const ClickButtonSearch = () => {
    console.log(selected)
    if (selected === '' || selected === '0') {
      return MySwal.fire({
        title: 'กรุณาระบุเลือกประเภทพนักงานขาย เพื่อใช้ในการค้นหาข้อมูล',
        confirmButtonText: (
          <Button color='primary' textColor='while' onClick={handleHTMLAlert}>OK</Button>
        ),
        customClass: {
          confirmButton: 'btn btn'
        },
        buttonsStyling: false
      })
    } else {
      StartDateSearch = Moment(stratDatepicker[0]).format('YYYY-MM-DD')
      EndDateSearch = Moment(endDatepicker[0]).format('YYYY-MM-DD')
      dispatch(
        getData_sales({
          page: currentPage,
          perPage: rowsPerPage,
          status: statusValue,
          getinfo: true,
          stratDate: Moment(stratDatepicker[0]).format('YYYY-MM-DD'),
          endDate: Moment(endDatepicker[0]).format('YYYY-MM-DD'),
          q: value,
          statuSelected: selected
        })
      )
    }
    
  }

  const ClickButtonClean = () => {
    dispatch(
      getData_sales({
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue,
        getinfo: false
      })
    )
  }

  useEffect(() => {
    dispatch(
      getData_sales({
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue,
        q: value
      })
    )
  }, [dispatch])

  const handleFilter = val => {
    setValue(val)
  }

  const handlePerPage = e => {
    dispatch(
      getData_sales({
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
    dispatch(
      getData_sales({
        page: currentPage,
        perPage: rowsPerPage,
        status: e.target.value,
        q: value
      })
    )
  }

  const handlePagination = page => {
    dispatch(
      getData_sales({
        page: page.selected + 1,
        perPage: rowsPerPage,
        status: statusValue,
        q: value,
        getinfo: true,
        stratDate: Moment(stratDatepicker[0]).format('YYYY-MM-DD'),
        endDate: Moment(endDatepicker[0]).format('YYYY-MM-DD'),
        statuSelected: selected
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
        containerClassName={'pagination react-paginate justify-content-end p-1'}
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
      return []
    }
  }

  const handleSelectedChange = e => {
    setSelected(e.value)
  }

  return store.data.length > 0 ? (
    <div className='invoice-list-wrapper'>
      <Card>
        <div className='invoice-list-dataTable'>
          <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0' style={{paddingTop:"15px", paddingRight:"10px"}}>
            <div style={{width:"15%"}}>
              <Select 
                theme={selectThemeColors}
                className='react-select ml-50 mr-2 w-100'
                classNamePrefix='select'
                defaultValue={colourOptions[0]}
                options={colourOptions}
                isClearable={false}
                onChange={handleSelectedChange}
              />
            </div>
            <div style={{width:"2%", textAlign:"center", marginTop:'7px'}}>
              <Label for='search-invoice'>ค้นหา</Label>
            </div>
            <div style={{width:"15%"}}>
              <Input
                id='search-invoice'
                className='ml-50 mr-2 w-100'
                type='text'
                value={value}
                onChange={e => handleFilter(e.target.value)}
                placeholder='รหัสพนักงาน/ชื่อพนักงาน'
              />
            </div>
            <div style={{width:"5%", textAlign:"center", marginTop:'7px'}}>
              <Label for='search-invoice'>ช่วงวันที่ </Label>
            </div>
            <div style={{width:"15%"}}>
              <Flatpickr
                value={stratDatepicker}
                onChange={date => setstratDatepicker(date)}
                className='form-control invoice-edit-input date-picker'
                options={{
                  dateFormat: 'd-m-Y'
                }}
              />
            </div>
            <div style={{width:"2%", textAlign:"center", marginTop:'7px'}}>
              <Label for='search-invoice'>ถึง</Label>
            </div>
            <div style={{width:"15%"}}>
              <Flatpickr
                value={endDatepicker}
                onChange={date => setendDatepicker(date)}
                className='form-control invoice-edit-input due-date-picker'
                options={{
                  dateFormat: 'd-m-Y'
                }}
              />
            </div>
            <div style={{width:"10%", justifyContent: 'flex-end', textAlign:"end"}}>
              <Button color='primary' style={{width:"100%", height:"100%"}} onClick={ClickButtonSearch}>ค้นหา</Button>
            </div>
            <div style={{width:"10%", justifyContent: 'flex-end', textAlign:"end"}}>
              <Button style={{color: "white", backgroundColor: "#808080ad", width:"100%", height:"100%"}} onClick={ClickButtonClean}>ยกเลิกการค้นหา</Button>
            </div>
          </div>
          <div style={{paddingTop:'30px', paddingBottom:'30px', textAlign:'center'}}></div>
          <DataTable
            noHeader
            pagination
            paginationServer
            columns={columns}
            responsive={true}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='invoiceId'
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            data={dataToRender()}
          />
        </div>
      </Card>
    </div>
  ) : ( 
    <div className='invoice-list-wrapper'>
      <Card>
        <div className='invoice-list-dataTable'>
          <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0' style={{paddingTop:"15px", paddingRight:"10px"}}>
            <div style={{width:"15%"}}>
              <Select 
                theme={selectThemeColors}
                className='react-select ml-50 mr-2 w-100'
                classNamePrefix='select'
                defaultValue={colourOptions[0]}
                options={colourOptions}
                isClearable={false}
                onChange={handleSelectedChange}
              />
            </div>
            <div style={{width:"2%", textAlign:"center", marginTop:'7px'}}>
              <Label for='search-invoice'>ค้นหา</Label>
            </div>
            <div style={{width:"15%"}}>
              <Input
                id='search-invoice'
                className='ml-50 mr-2 w-100'
                type='text'
                value={value}
                onChange={e => handleFilter(e.target.value)}
                placeholder='รหัสพนักงาน/ชื่อพนักงาน'
              />
            </div>
            <div style={{width:"5%", textAlign:"center", marginTop:'7px'}}>
              <Label for='search-invoice'>ช่วงวันที่ </Label>
            </div>
            <div style={{width:"15%"}}>
              <Flatpickr
                value={stratDatepicker}
                onChange={date => setstratDatepicker(date)}
                className='form-control invoice-edit-input date-picker'
                options={{
                  dateFormat: 'd-m-Y'
                }}
              />
            </div>
            <div style={{width:"2%", textAlign:"center", marginTop:'7px'}}>
              <Label for='search-invoice'>ถึง</Label>
            </div>
            <div style={{width:"15%"}}>
              <Flatpickr
                value={endDatepicker}
                onChange={date => setendDatepicker(date)}
                className='form-control invoice-edit-input due-date-picker'
                options={{
                  dateFormat: 'd-m-Y'
                }}
              />
            </div>
            <div style={{width:"10%", justifyContent: 'flex-end', textAlign:"end"}}>
              <Button color='primary' style={{width:"100%", height:"100%"}} onClick={ClickButtonSearch}>ค้นหา</Button>
            </div>
            <div style={{width:"10%", justifyContent: 'flex-end', textAlign:"end"}}>
              <Button style={{color: "white", backgroundColor: "#808080ad", width:"100%", height:"100%"}} onClick={ClickButtonClean}>ยกเลิกการค้นหา</Button>
            </div>
          </div>
          <div style={{paddingTop:'30px', paddingBottom:'30px', textAlign:'center'}}>There are no records to display</div>
        </div>
      </Card>
    </div>
  )
}

export default SalesList
