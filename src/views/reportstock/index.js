import {Fragment, useState, useEffect} from 'react'
import { Row, Col, CardTitle, CardText, FormGroup, Label, Button, Card, Container, Table} from 'reactstrap'
import Avatar from '@components/avatar'
import { Download } from 'react-feather'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

import '@styles/base/pages/page-auth.scss'

const reportstok = () => {

  const [currentDate, setCurrentDate] = useState()
  const [nameDate, setNameDate] = useState()

  const dateReport = () => {
    const date = new Date()
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = date.getDate()
    const fulldate = `${d}/${m}/${y}`
    setCurrentDate(fulldate)
  }

  const reportName = () => {
    const date = new Date()
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = date.getDate()
    const fulldate = `${d}${m}${y}`
    setNameDate(fulldate)
  }

  useEffect(() => {
    dateReport()
    reportName()
  }, [])

  return (
    <div>
    <Card className='w-100 py-2'>
      <div className="mb-1 ml-5">
        <h3><b>Report Stock</b></h3>
      </div>
      <Container className='themed-container' fluid="sm">
        <Table bordered responsive="xl">
          <thead>
            <tr>
              <th style={{backgroundColor:'#cce5ff'}} className="text-center">รายงาน</th>
              <th style={{backgroundColor:'#cce5ff'}} className="text-center">วันที่นำเข้าเอกสาร</th>
              <th style={{backgroundColor:'#cce5ff'}} className="text-center">ดาวน์โหลด</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">รายงาน [TRW]Stock ALL_{nameDate}.xlsx</td>
              <td className="text-center">{currentDate}</td>
              <td className="text-center"><a href={location.port === '3000' ? 'http://localhost:8085/Service/stockexcel' : `${window.location.protocol}//${window.location.host}/Service/stockexcel`}><Download size={22}></Download></a></td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </Card>
    </div>
  )
}

export default reportstok
