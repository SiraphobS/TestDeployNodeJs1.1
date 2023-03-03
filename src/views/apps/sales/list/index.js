// ** React Imports
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Flatpickr from 'react-flatpickr'
import axios from 'axios'

import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Table Columns
import { columns } from './columns'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Button, Label, Input, CustomInput, Row, Col, Card } from 'reactstrap'

// ** Store & Actions
import { getData_sales } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import Moment from 'moment'

export let StartDateSearch = ''
export let EndDateSearch = ''

const CustomHeader = ({ handleFilter, value, handleStatusValue, statusValue, handlePerPage, rowsPerPage, ClickButtonSearch, ClickButtonClean, stratDatepicker, setstratDatepicker, endDatepicker, setendDatepicker }) => {
  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <Row>
        <Col
          lg='12'
          className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pr-lg-1 p-0'
        >
          <div className='d-flex align-items-center'>
            <Label for='search-invoice'>ค้นหา</Label>
            <Input
              id='search-invoice'
              className='ml-50 mr-2 w-100'
              type='text'
              value={value}
              onChange={e => handleFilter(e.target.value)}
              placeholder='รหัสพนักงาน/ชื่อพนักงาน'
            />
          </div>
          <div className='d-flex align-items-center mr-1' style={{width:"300px"}}>
            <Label for='search-invoice' style={{width:"25%"}}>ช่วงวันที่ </Label>
            <Flatpickr
              value={stratDatepicker}
              onChange={date => setstratDatepicker(date)}
              className='form-control invoice-edit-input date-picker'
              options={{
                dateFormat: 'd-m-Y'
              }}
            />
          </div>
          <div className='d-flex align-items-center mr-1' style={{width:"300px"}}>
            <Label for='search-invoice ' style={{width:"25%"}}> ถึง </Label>
            <Flatpickr
              value={endDatepicker}
              onChange={date => setendDatepicker(date)}
              className='form-control invoice-edit-input due-date-picker'
              options={{
                dateFormat: 'd-m-Y'
              }}
            />
          </div>
          <div>
            <button className="btn btn mr-1" style={{color: "white", backgroundColor: "#0161c8", width:"140px"}} onClick={ClickButtonSearch}>ค้นหา</button>
          </div>
          <div>
            <button className="btn btn mr-1" style={{color: "white", backgroundColor: "#808080ad", width:"140px"}} onClick={ClickButtonClean}>ยกเลิกการค้นหา</button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const SalesList = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.invoice)

  const [value, setValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [stratDatepicker, setstratDatepicker] = useState(new Date())
  const [endDatepicker, setendDatepicker] = useState(new Date())

  const ClickButtonSearch = () => {
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
        q: value
      })
    )
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
        q: value
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
      //return store.allData.slice(0, rowsPerPage)
    }
  }

  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <div className='invoice-list-dataTable'>
          <DataTable
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
            subHeaderComponent={
              <CustomHeader
                value={value}
                statusValue={statusValue}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                handleStatusValue={handleStatusValue}
                ClickButtonSearch={ClickButtonSearch}
                ClickButtonClean={ClickButtonClean}
                setstratDatepicker={setstratDatepicker}
                stratDatepicker={stratDatepicker}
                setendDatepicker={setendDatepicker}
                endDatepicker={endDatepicker}
              />
            }
          />
        </div>
      </Card>
    </div>
  )
}

export default SalesList
