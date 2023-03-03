import {useEffect, useState, useRef} from 'react'
import { Row, Col, CardTitle, CardText, FormGroup, Label, Button, Card, Container, Form, Alert} from 'reactstrap'
import Avatar from '@components/avatar'
import { Download } from 'react-feather'
import { FaUpload, FaDownload } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import readXlsxFile from 'read-excel-file'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

import '@styles/base/pages/page-auth.scss'

const stockonline = () => {

  const toastId = useRef(null)

  const fontStyle = {
    fontSize:'16px'
  }
  const btnStyle = {
    width:'60%',
    fontSize:'17px'
  }
  const [resMsg, setResMsg] = useState()

  const postApi = () => {
    axios.get(location.port === '3000' ? 'http://localhost:8085/Service/getserialno' : `${window.location.protocol}//${window.location.host}/Service/getserialno`).then((response) => {
      const getApi = response.data.map(item => ({
        serial:item.serialnumber,
        model:item.model,
        workorder:item.workorder,
        description:item.description,
        note:item.note,
        sr_no:item.sr_no
      }))
      console.log(getApi)
      axios.post('https://bes.tirawatapp.com/api/tim/serial', getApi).then((response) => {
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

  const excelApi = () => {
    const input = document.getElementById('excelseiralno')

    input.addEventListener('change', () => {
      readXlsxFile(input.files[0]).then((rows) => {
        const excelData = rows.filter(obj => obj[0] !== 'model'
      ).map((item) => ({
          model: item[0],
          workorder: item[1],
          year: item[2],
          from: item[3],
          to: item[4],
          description: item[5],
          note: item[6]
        }))

        const postAPI = () => {
          console.log(excelData)
          axios.request({
            method: 'post',
            url: location.port === '3000' ? 'http://localhost:8085/Service/serialfromexcel' : `${window.location.protocol}//${window.location.host}/Service/serialfromexcel`,
            data: excelData
          }).then((value) => {
            console.log(value)
            if (value.data === 'OK') {
              setTimeout(function () {
                axios.get(location.port === '3000' ? 'http://localhost:8085/Service/getserialno' : `${window.location.protocol}//${window.location.host}/Service/getserialno`).then((response) => {
                  const getApi = response.data.map(item => ({
                    serial:item.serialnumber,
                    model:item.model,
                    workorder:item.workorder,
                    description:item.description,
                    note:item.note,
                    sr_no:item.sr_no
                  }))

                  axios.post('https://bes.tirawatapp.com/api/tim/serial', getApi).then((response) => {
                    if (response.data.status === 201) {
                      toast('ทำการส่งข้อมูล API แล้วเรียบร้อย')
                    }
                    axios.post(location.port === '3000' ? 'http://localhost:8085/Service/updateserialstatus' : `${window.location.protocol}//${window.location.host}/Service/updateserialstatus`, [{record: response.data.message}])
                    console.log(response.data.message)
                    setResMsg(
                      <div className="py-0 mb-1 mr-4 ml-4 mt-0">
                      <Alert color="success">
                        <h4 className="alert-heading text-left p-1">แจ้งเตือน API ถูกส่งไปแล้วเรียบร้อย</h4>
                        <p className="text-left p-1">
                          ทำการส่ง API Serial No. แล้ว<u>จำนวน {response.data.message} รายการ</u>
                        </p>
                      </Alert>
                    </div>
                    )
                    setTimeout(function () {
                      document.getElementById("excelseiralno").value = ""
                      setResMsg()
                    }, 6000)
                  })
                  .catch((err) => {
                    console.log(err)
                    toast('เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง')
                    setTimeout(function () {
                      document.getElementById("excelseiralno").value = ""
                    }, 3500)
                  })
                }).catch((err) => {
                  console.log(err)
                  toast('เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง')
                  setTimeout(function () {
                    document.getElementById("excelseiralno").value = ""
                  }, 3500)
                })
              }, 5000)
            }
          }).catch((err) => {
            console.log(err)
            toast('เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง')
            setTimeout(function () {
              document.getElementById("excelseiralno").value = ""
            }, 3500)
            console.log(err)
          })
        }
        const clearState = () => {
          document.getElementById("excelseiralno").value = ""
        }
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div id="react-confirm-alert">
                <div style={{background:'none'}} className="react-confirm-alert-overlay">
                  <div className="react-confirm-alert">
                    <div className="react-confirm-alert-body">
                      <h1><b>ยืนยันการส่งข้อมูล</b></h1>
                      <p style={{color:'red'}}>ยืนยันการส่งข้อมูล API Serial no หรือไม่</p>
                      <div className="react-confirm-alert-button-group text-center">
                        <Row>
                          <Col className="text-center" md='6'>
                            <button className="btn btn-danger" onClick={() => { clearState(); onClose() }}>ยกเลิก</button>
                          </Col>
                          <Col className="text-center" md='6'>
                            <button onClick={() => { postAPI(); onClose() }} className="btn btn-success">ยืนยัน</button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        })
      })
    })
  }

  useEffect(() => {
    excelApi()
  }, [])

  return (
    <div>
      <Card className='w-100 py-2'>
        <div className="mb-1 ml-5">
          <h3><b>ส่งข้อมูล API Serial No.</b></h3>
        </div>
        <Container className='themed-container' fluid="sm">
          <Row>
            <Col xs="12" md="12">
              <div className='py-2 mb-1 mr-4 ml-4' style={{backgroundColor:'#ededed'}}>
                <Row>
                  <Col className='text-center' xs='12' md='6' lg='6'><button onClick={postApi} style={btnStyle} className='btn btn-warning'>Submit API</button></Col>
                  <Col xs='12' md='6' lg='6'><p style={fontStyle}><b>เมื่อ API มีข้อผิดพลาด สามารถใช้เมนูนี้บนเว็บไซต์เพื่อใช้ในการส่งข้อมูลแบบ POST ไปยังปลายทาง</b></p></Col>
                </Row>
              </div>
            </Col>
            <Col xs="12" md="12">
              <div className='py-2 mb-1 mr-4 ml-4' style={{backgroundColor:'#ededed'}}>
                <Row>
                  <Col className='text-center' xs='12' md='6' lg='6'>
                    <Form>
                      <FormGroup>
                        <label style={{width:'60%', fontSize:'17px'}} className="btn btn-success">
                          Upload&nbsp;&nbsp;&nbsp;<FaUpload /> <input type="file" id="excelseiralno" hidden/>
                        </label>
                      </FormGroup>
                    </Form>
                  </Col>
                  <Col xs='12' md='6' lg='6'><p style={fontStyle}><b>อัพโหลดข้อมูลจาก Excel สำหรับการส่งข้อมูล Serial No แบบ Excel</b></p></Col>
                </Row>
              </div>
            </Col>
            <Col xs="12" md="12">
              <div className='py-2 mb-1 mr-4 ml-4' style={{backgroundColor:'#ededed'}}>
                <Row>
                  <Col className='text-center' xs='12' md='6' lg='6'><a href="https://trwgroup-my.sharepoint.com/:f:/g/personal/no_reply_tirawatgroup_co/Eopqx_XaAZpMtyCnJH_k_aMBxtCe0CRUH0VlQHd6ZEdtZQ" target="_blank" style={btnStyle} className='btn btn-primary'>Template</a></Col>
                  <Col xs='12' md='6' lg='6'><p style={fontStyle}><b>รูปแบบเอกสารเพื่อใช้ในการส่งข้อมูล Serial No.</b></p></Col>
                </Row>
              </div>
            </Col>

          </Row>
          {resMsg}
        </Container>
      </Card>
    </div>
  )
}

export default stockonline
