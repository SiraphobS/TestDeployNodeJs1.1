import {Fragment} from 'react'
import { Row, Col, CardTitle, CardText, FormGroup, Label, Button, Card, Container} from 'reactstrap'
import Avatar from '@components/avatar'
import { Download } from 'react-feather'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

import '@styles/base/pages/page-auth.scss'

const stockonline = () => {
  const fontStyle = {
    fontSize:'16px'
  }
  const btnStyle = {
    width:'60%',
    fontSize:'17px'
  }
  const postApi = () => {
    axios.get(location.port === '3000' ? 'http://localhost:8085/Service/getstockdetail' : `${window.location.protocol  }//${window.location.host}/Service/getstockdetail`).then((response) => {
      const getApi = response.data.map(item => ({navcode:item.No_, qty:item.QTY}))
      console.log(getApi)
      axios.post('https://bes.tirawatapp.com/api/tcon/stock', getApi).then((response) => {
        if (response.data.status === 201) {
            toast('ทำการส่งข้อมูล API แล้วเรียบร้อย')
        }
      })
      .catch((err) => {
          toast('เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง')
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }
  console.log(process.env.REACT_APP_API_ENDPOINT)
  return (
    <div>
      <Card className='w-100 py-2'>
        <div className="mb-1 ml-5">
          <h3><b>ส่งข้อมูล API Stock</b></h3>
        </div>
        <Container className='themed-container' fluid="sm">
          <Row>
            <Col xs='12'>
              <div className='py-2 mb-1 mr-4 ml-4' style={{backgroundColor:'#ededed'}}>
                <Row>
                  <Col className='text-center' xs='6'><button onClick={postApi} style={btnStyle} className='btn btn-warning'>Submit API</button></Col>
                  <Col xs='6'><p style={fontStyle}><b>เมื่อ API มีข้อผิดพลาด สามารถใช้เมนูนี้บนเว็บไซต์เพื่อใช้ในการส่งข้อมูลแบบ POST ไปยังปลายทาง</b></p></Col>
                </Row>
              </div>
            </Col>
            <Col xs='12'>
              <div className='py-2 mb-1 mr-4 ml-4' style={{backgroundColor:'#ededed'}}>
                <Row>
                  <Col className='text-center' xs='6'><a style={btnStyle} href={location.port === '3000' ? 'http://localhost:8085/Service/stockexcel' : `${window.location.protocol}//${window.location.host}/Service/stockexcel`} className='btn btn-success'>Export &nbsp;&nbsp;&nbsp;&nbsp;<Download size={18}></Download></a></Col>
                  <Col xs='6'><p style={fontStyle}><b>ดาวน์โหลดข้อมูลที่มีทั้งหมดใน Database</b></p></Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  )
}

export default stockonline
