import { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'

// ** Third Party Components
import axios from 'axios'
import { Row, Col, Alert } from 'reactstrap'

// ** Invoice Preview Components
import PreviewCard from './PreviewCard'

// ** Styles
import '@styles/base/pages/app-invoice.scss'

const SalesPreview = () => {
  // ** Vars
  
  const { id } = useParams()
  const { state } = useLocation()
  const dateArraySales = state.split(',')

  const Data = ({
    id: `${id}`,
    startDate: `${dateArraySales.length > 10 ? `${dateArraySales[9]}` : `${dateArraySales[8]}`}`,
    endDate: `${dateArraySales.length > 10 ? `${dateArraySales[10]}` : `${dateArraySales[9]}`}`
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
        <Col xl={12} md={12} sm={12}>
          <PreviewCard data={data} dataSales={dateArraySales}/>
        </Col>
        {/* <Col xl={3} md={4} sm={12}>
          <PreviewActions id={id} setSendSidebarOpen={setSendSidebarOpen} setAddPaymentOpen={setAddPaymentOpen} />
        </Col> */}
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>Invoice not found</h4>
      <div className='alert-body'>
        Invoice with id: {id} doesn't exist. Check list of all invoices: <Link to='/invoice/list'>Invoice List</Link>
      </div>
    </Alert>
  )
}

export default SalesPreview
