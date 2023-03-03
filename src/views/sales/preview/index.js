import { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'

// ** Third Party Components
import axios from 'axios'
import { Row, Col, Alert, Spinner } from 'reactstrap'

// ** Invoice Preview Components
import PreviewCard from './PreviewCard'

// ** Styles
import '@styles/base/pages/app-invoice.scss'

import SalesComLine from '../preview/list'

const SalesPreview = () => {
  // ** Vars
  
  const { id } = useParams()
  const { state } = useLocation()
  const dateArraySales = state.split(',')

  const Data = ({
    id: `${id}`,
    startDate: `${dateArraySales.length > 13 ? `${dateArraySales[9]}` : `${dateArraySales[8]}`}`,
    endDate: `${dateArraySales.length > 13 ? `${dateArraySales[10]}` : `${dateArraySales[9]}`}`,
    type: `${dateArraySales.length > 13 ? `${dateArraySales[13]}` : `${dateArraySales[12]}`}`
  })

  // ** States
  const [data, setData] = useState(null)
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)

  // ** Functions to toggle add & send sidebar
  const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen)
  const toggleAddSidebar = () => setAddPaymentOpen(!addPaymentOpen)
  
  // ** Get invoice on mount based on id
  useEffect(() => {
    console.log(Data)
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/GetCommission`, Data).then(response => {
      setData(response.data)
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
  }, [])   

  return data !== null ? (
    <div className='invoice-preview-wrapper'>
      <Row className='invoice-preview'>
        <Col xs='12'>
          <SalesComLine Data={Data} dataSales={dateArraySales}/>
        </Col>
      </Row>
    </div>
  ) : (
    <Spinner color='primary' />
  )
}

export default SalesPreview
