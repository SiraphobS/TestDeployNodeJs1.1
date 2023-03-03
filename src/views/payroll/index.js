
import {useEffect, useState, useRef} from 'react'
import { Row, Col, CardTitle, CardText, FormGroup, Label, Button, Card, Container, Table, Input, Form, FormText, Alert} from 'reactstrap'
import Avatar from '@components/avatar'
import { Download } from 'react-feather'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import readXlsxFile from 'read-excel-file'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { FaUpload, FaDownload } from 'react-icons/fa'

import '@styles/base/pages/page-auth.scss'

const payroll = () => {

  const toastId = useRef(null)

  console.log(toastId)

  const ColoredLine = ({ color }) => (
    <hr
      style={
        {
          color,
          backgroundColor: color,
          height: 2
        }
      }
    />
  )

  const [uploadMsg, setUploadMsg] = useState()
  const [isEmpty, setIsEmpty] = useState()
  const [uploadCheck, setUploadCheck] = useState()
  const [record, setRecord] = useState([])
  const [msgErr, setMsgErr] = useState()
  const [sendValue, setSendValue] = useState()
  const [unsentValue, setUnsentValue] = useState()

  const getExcelInput = () => {
    //Upload excel
    const excel = document.getElementById('excelpayroll')
    excel.addEventListener('change', () => {
      readXlsxFile(excel.files[0]).then((rows) => {

        toast(`ทำการอัพโหลดไฟล์ ${excel.files[0].name} แล้วเรียบร้อย`, {autoClose: 1500})
        setUploadMsg(
          <div className="py-0 mb-1 mr-4 ml-4 mt-0">
            <Alert color="success">
              <h4 className="alert-heading text-left p-1">อัพโหลดไฟล์สำเร็จ</h4>
              <p className="text-left p-1">
                ทำการอัพโหลดไฟล์ {excel.files[0].name} แล้วเรียบร้อย
              </p>
            </Alert>
          </div>
        )
        //Loop data from excel
        const excelRecord = rows.filter(obj => obj[0] !== 'สาขา'
      ).map((item) => {
          //Values input to DB
          return ({
              pr_branch:item[0],
              pr_department:item[1],
              pr_department_name:item[2],
              pr_code:item[3],
              pr_emp_name:item[5],
              pr_emp_email:item[6],
              pr_all_department:item[7],
              pr_all_branch:item[8],
              pr_date:item[9],
              pr_salary:item[10],
              pr_position:item[11],
              pr_phone_bill:item[12],
              pr_commission:item[13],
              pr_depreciation:item[14],
              pr_gas_cost:item[15],
              pr_expertise_cost:item[16],
              pr_certificate_cost:item[17],
              pr_allowance:item[18],
              pr_bonus:item[19],
              pr_overtime:item[20],
              pr_diligent_allowance:item[21],
              pr_other_income:item[22],
              pr_total_income:item[23],
              pr_fdata30_total_pay:item[24],
              pr_late_deducted_money:item[25],
              pr_deducted_from_work_early:item[26],
              pr_deducted_leave:item[27],
              pr_deducted_defects:item[28],
              pr_withdraw_advance:item[29],
              pr_deducted_damage_cost:item[30],
              pr_other_deducted:item[31],
              pr_deducted_tax:item[32],
              pr_deducted_fund:item[33],
              pr_deducted_social_security:item[34],
              pr_deducted_guarantee:item[35],
              pr_deducted_loan_1:item[36],
              pr_deducted_installment:item[37],
              pr_total_deducted:item[38],
              pr_total_net_income:item[39],
              pr_id_card:item[4]
            })
        })//end map
        // Send mail to
        const sendEmail = () => {
          axios.request({
            method: 'post',
            url: location.port === '3000' ? 'http://localhost:8085/Service/insertpayroll' : `${window.location.protocol}//${window.location.host}/Service/insertpayroll`,
            data: excelRecord,
            onUploadProgress: p => {
              toastId.current = toast('รอสักครู่ ระบบกำลังทำการส่ง Email', {autoClose: false})
            }
          })
          .then((value) => {
            console.log(value.data.rowsSent)
            toast.update(toastId.current, {
              render: 'ทำการส่ง Email แล้วเรียบร้อย',
              autoClose: 5000,
              bodyClassName: "font-white"
            })
            setSendValue(
              <div className="py-0 mb-1 mr-4 ml-4 mt-0">
              <Alert color="success">
                <h4 className="alert-heading text-left p-1">แจ้งเตือน Email ที่ส่งไปแล้ว</h4>
                <p className="text-left p-1">
                  ทำการส่ง Email แล้ว<u>จำนวน {value.data.rowsSent} รายการ</u>
                </p>
              </Alert>
            </div>
          )
          setUnsentValue(
            <div className="py-0 mb-1 mr-4 ml-4 mt-0">
            <Alert color="warning">
              <h4 className="alert-heading text-left p-1">แจ้งเตือน Email ที่ไม่ได้ส่ง</h4>
              <p className="text-left p-1">
                Email ที่ยังไม่ได้ส่ง<u>จำนวน {value.data.rowsUnsent} รายการ</u>
              </p>
            </Alert>
          </div>
          )

            setTimeout(function () {
              document.getElementById("excelpayroll").value = ""
              setUploadMsg()
            }, 5000)

          })
          .catch((err) => {
            console.log(err)
            toast.update(toastId.current, {
              render: 'เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง',
              autoClose: 5000,
              bodyClassName: "font-white"
            })
            setTimeout(function () {
              document.getElementById("excelpayroll").value = ""
              setUploadMsg()
            }, 3500)
          })
        }
        //clear input file state
        const clearState = () => {
          document.getElementById("excelpayroll").value = ""
          setUploadMsg()
        }
        // Alert button
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div id="react-confirm-alert">
                <div style={{background:'none'}} className="react-confirm-alert-overlay">
                  <div className="react-confirm-alert">
                    <div className="react-confirm-alert-body">
                      <h1><b>ยืนยันข้อมูล</b></h1>
                      <p style={{color:'red'}}>ยืนยันการส่งใบเงินเดือนให้พนักงานผ่าน email หรือไม่</p>
                      <div className="react-confirm-alert-button-group text-center">
                        <Row>
                          <Col className="text-center" md='6'>
                            <button className="btn btn-danger" onClick={() => { clearState(); onClose() }}>ยกเลิก</button>
                          </Col>
                          <Col className="text-center" md='6'>
                            <button onClick={() => { sendEmail(); onClose() }} className="btn btn-success">ยืนยัน</button>
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
    getExcelInput()
  }, [])

  const fontStyle = {
    fontSize:'14px'
  }
  const btnStyle = {
    width:'60%',
    fontSize:'17px'
  }
  return (
    <div>
      <Card className='w-100 py-2'>
        <div className="mb-1 ml-5">
          <h3><b>Intranet Payroll System</b></h3>
        </div>
        <div className="text-center">
          <Row>
            <Col xs="12" md="12">
              <div className='py-2 mb-1 mr-4 ml-4' style={{backgroundColor:'#ededed'}}>
                <Row>
                  <Col className="text-center" xs='12' md='4' lg='4' sm='12'>
                    <Form>
                      <FormGroup>
                        <label style={{width:'50%'}} className="btn btn-success">
                          Upload&nbsp;&nbsp;&nbsp;<FaUpload /> <input type="file" id="excelpayroll" hidden/>
                        </label>
                      </FormGroup>
                    </Form>
                  </Col>
                  <Col className="text-left" xs='12' md='8' lg='8' sm='12'>
                    <p style={fontStyle}><b>โปรดตรวจสอบข้อมูลและยืนยันความถูกต้องก่อน upload file</b></p>
                  </Col>
                </Row>
              </div>
              <div className='py-2 mb-1 mr-4 ml-4' style={{backgroundColor:'#ededed'}}>
                <Row>
                  <Col className="text-center" xs='12' md='4' lg='4'>
                    <a className="btn btn-warning" href="https://trw-outbound.s3.ap-southeast-1.amazonaws.com/HRIS/trw-payroll-intranet-template.xlsx"  style={{width:'50%'}}>Template&nbsp;&nbsp;&nbsp;<FaDownload /></a>
                  </Col>
                  <Col className="text-left" xs='12' md='8' lg='8'>
                    <p style={fontStyle}><b>รูปแบบเอกสารเพื่อใช้ในการส่งข้อมูลเงินเดือนของพนักงาน</b></p>
                  </Col>
                </Row>
              </div>
              {sendValue}
              {unsentValue}
              {uploadCheck}
              {uploadMsg}
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  )
}

export default payroll
