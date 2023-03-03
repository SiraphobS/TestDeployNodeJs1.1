import { useState, Fragment, useRef, useEffect } from 'react'
// ** Third Party Components
import { Card, CardBody, CardText, Row, Col, Table, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, CustomInput } from 'reactstrap'
import { Eye } from 'react-feather'
import Moment from 'moment'
import Flatpickr from 'react-flatpickr'

import '@styles/react/libs/flatpickr/flatpickr.scss'

import XLSX from 'xlsx'
import * as FileSaver from 'file-saver'

import axios from 'axios'

import logo from '@src/assets/images/logo/logo_TRW.jpg' // with import

const PreviewCard = ({ data, dataSales, value }) => {
  const itemRows = []
  const CommissionLineitemRows = []

  let sumAmount = Number(0)
  let sumCommission = Number(0)
  let PaymentChannel = ""
  const arrayCheckboxTest = []
  let CheckedAll = ''

  const DataPostCommissionLineItem = ({
    document_no: ''
  })

  const dataCommissionItemLine = []

  const [checkedall, setCheckedAll] = useState(false)

  const [arrayCheckbox, setarrayCheckbox] = useState(arrayCheckboxTest)

  const [modal, setModal] = useState(false)
  const [fileName, setFileName] = useState('')
  const [fileFormat, setFileFormat] = useState('xlsx')

  const handleCheckAll = (event) => {
    setCheckedAll(event.target.checked)
    const newArr = [...arrayCheckbox]
    for (let i = 0; i < [...arrayCheckbox].length; i++) {
      newArr[i] = event.target.checked
    }
    setarrayCheckbox(newArr)
  }

  const handleCheck = (event) => {
    if (checkedall !== false) {
      setCheckedAll(false)
    }
    const newArr = [...arrayCheckbox]
    newArr[event.target.id] = event.target.checked 
    setarrayCheckbox(newArr)
    for (let i = 0; i < [...arrayCheckbox].length; i++) {
      CheckedAll = CheckedAll + newArr[i].toString()
    }
    if (!CheckedAll.includes("false")) {
      setCheckedAll(true)
    }
  }

  const toggleModal2 = (document_no) => {
    
    DataPostCommissionLineItem.document_no = document_no
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/GetCommissionLineItem`, DataPostCommissionLineItem).then(response => {
      dataCommissionItemLine = response.data
      console.log('****************************1******************************************')
      console.log(dataCommissionItemLine)
      console.log('**********************************************************************')
    })
    .catch(function (error) {
      console.log(error)
    })

    console.log('**********************************************************************')
    console.log(dataCommissionItemLine)
    console.log('**********************************************************************')
    
    // for (let index = 0; index < dataCommissionItemLine.length; index++) {
    //   console.log(response.data[index]["Posting Date"])
    //   const row = (
    //     <tr className='border-bottom'>
    //       <td className='py-1'>
    //         <span className='font-weight-bold'>{index + 1}</span>
    //       </td>
    //       <td className='py-1'>
    //         <span className='font-weight-bold'>{Moment(dataCommissionItemLine[index]["Posting Date"]).format('YYYY-MM-DD')}</span>
    //       </td>
    //       <td className='py-1'>
    //         <span className='font-weight-bold'>{dataCommissionItemLine[index]["Document Type"]}</span>
    //       </td>
    //       <td className='py-1'>
    //         <span className='font-weight-bold'>{dataCommissionItemLine["Document No_"]}</span>
    //       </td>
    //       <td className='py-1'>
    //         <span className='font-weight-bold'>{dataCommissionItemLine["Customer No_"]}</span>
    //       </td>
    //       <td className='py-1'>
    //         <span className='font-weight-bold'>{Intl.NumberFormat().format(Number(dataCommissionItemLine["Sales (LCY)"]).toFixed(2))}</span>
    //       </td>
    //       <td className='py-1'>
    //         <span className='font-weight-bold'>{Intl.NumberFormat().format(Number(dataCommissionItemLine["Sales+Vat"]).toFixed(2))}</span>
    //       </td>
    //       <td className='py-1'>
    //         <span className='font-weight-bold'>{Intl.NumberFormat().format(Number(dataCommissionItemLine["Remaining Amount"]).toFixed(2))}</span>
    //       </td>
    //       <td className='py-1'>
    //         <span className='font-weight-bold'>{Intl.NumberFormat().format(Number(dataCommissionItemLine["Commission"]).toFixed(2))}</span>
    //       </td>
    //     </tr>
    //   )
    //   CommissionLineitemRows.push(row)
    // }

    // console.log(CommissionLineitemRows)
    setModal(!modal)
  }

  for (let index = 0; index < data.length; index++) {
    sumAmount = sumAmount + Number(data[index]["Sales (LCY)"])
    sumCommission = sumCommission + Number(data[index]["Commission"][1])
    if (data[index]["Document No_"][1].substring(0, 1) === "C") {
      PaymentChannel = "เงินสด"
    } else if (data[index]["Document No_"][1].substring(0, 1) === "T") {
      PaymentChannel = "โอนเงิน"
    } else if (data[index]["Document No_"][1].substring(0, 1) === "P") {
      PaymentChannel = "เช็ค"
    }

    arrayCheckboxTest.push(false)

    const row = (
      <tr className='border-bottom'>
        <td className='py-1'>
          <span className='font-weight-bold'>{index + 1}</span>
        </td>
        <td className='py-1'>
          <span className='font-weight-bold'>{Moment(data[index]["Document Date"]).format('YYYY-MM-DD')}</span>
        </td>
        <td className='py-1'>
          <span className='font-weight-bold'>{data[index]["Document Type"]}</span>
        </td>
        <td className='py-1'>
          <span className='font-weight-bold'>{data[index]["Document No_"]}</span>
        </td>
        <td className='py-1'>
          <span className='font-weight-bold'>{data[index]["Customer No_"]}</span>
        </td>
        <td className='py-1'>
          <span className='font-weight-bold'>{Intl.NumberFormat().format(Number(data[index]["Sales (LCY)"]).toFixed(2))}</span>
        </td>
        <td className='py-1'>
          <span className='font-weight-bold'>{Intl.NumberFormat().format(Number(data[index]["Sales+Vat"]).toFixed(2))}</span>
        </td>
        <td className='py-1'>
          <span className='font-weight-bold'>{Intl.NumberFormat().format(Number(data[index]["Remaining Amount"]).toFixed(2))}</span>
        </td>
        <td className='py-1'>
          <span className='font-weight-bold'>{Intl.NumberFormat().format(Number(data[index]["Commission"]).toFixed(2))}</span>
        </td>
        <td className='py-1'>
          <CustomInput inline type='checkbox' id={index} checked={arrayCheckbox[index]} onChange={handleCheck}/>
        </td>
        <td className='py-1'>
          <Button className='btn-icon' onClick={() => toggleModal2(data[index]["Document No_"])} color='flat-gray'><Eye size={16} /></Button>
        </td>
      </tr>
    )
    
    itemRows.push(row)
  }

  const tableRef = useRef()

  const toggleModal = () => {
    setModal(!modal)
  }

  const handleExport = () => {
    toggleModal()
    const bookType = fileFormat
    const wb = XLSX.utils.table_to_book(tableRef.current, { sheet: 'Sheet JS' })
    const wbout = XLSX.write(wb, { bookType, bookSST: true, type: 'binary' })

    const s2ab = s => {
      const buf = new ArrayBuffer(s.length)
      const view = new Uint8Array(buf)
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff
      return buf
    }
    const file = `commission_${dataSales[0]}_${dataSales.length > 10 ? `${Moment(dataSales[9]).format('YYYYMMDD')}_${Moment(dataSales[10]).format('YYYYMMDD')}` : `${Moment(dataSales[8]).format('YYYYMMDD')}_${Moment(dataSales[9]).format('YYYYMMDD')}`}.xlsx`

    return FileSaver.saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), file)
  }

  const handlesubmit = () => {

    // useEffect(() => {
    //   console.log(Data)
    //   axios.post(`${process.env.REACT_APP_API_ENDPOINT}/GetCommission`, Data).then(response => {
    //     console.log(response.data)
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
    // }, [])
  }

  return data !== null ? (
    <Fragment>
    <Card className='invoice-preview-card'>
      <CardBody className='invoice-padding pb-0'>
        {/* Header */}
        <div className='justify-content-between flex-md-row flex-column invoice-spacing mt-0' style={{width:"100%"}}>
          <div>
            <div className='logo-wrapper'>
              <img style={{width:"300px"}} src={logo} />
            </div>
            <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
              <div style={{width:"45%"}}>
                <CardText className='mb-25'>ชื่อ-นามสกุลพนักงาน : {dataSales[1]}</CardText>
                <CardText className='mb-25'>รหัสพนักงาน : {dataSales[0]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ตำแหน่งพนักงาน : {dataSales.length > 10 ? `${dataSales[5]}` : `${dataSales[4]}`}</CardText>
                <CardText className='mb-25'>เบอร์โทรศัพท์ : {dataSales.length > 10 ? `${dataSales[3]}, ${dataSales[4]}` : `${dataSales[3]}`}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E-Mail : {dataSales[2]}</CardText>
              </div>
              <div style={{width:"35%"}}>
                <CardText className='mb-25'>วันที่ {dataSales.length > 10 ? `${dataSales[9]} - ${dataSales[10]}` : `${dataSales[8]} - ${dataSales[9]}`}</CardText>
              </div>
              <div style={{width:"20%", textAlign:"end"}}>
                <CardText className='mb-25'>{dataSales.length > 10 ? `${dataSales[6] !== '0' ? `เป้า ${Intl.NumberFormat().format(Number(dataSales[6]).toFixed(2))} บาท` : ``}` : `${dataSales[5] !== '0' ? `เป้า ${Intl.NumberFormat().format(Number(dataSales[5]).toFixed(2))} บาท` : ``}`}</CardText>
                <CardText className='mb-25'>{dataSales.length > 10 ? `ยอดขายทั้งหมด ${Intl.NumberFormat().format(Number(dataSales[7]).toFixed(2))} บาท` : `ยอดขายทั้งหมด ${Intl.NumberFormat().format(Number(dataSales[6]).toFixed(2))} บาท`}</CardText>
                <CardText className='mb-25'>{dataSales.length > 10 ? `ค่าคอมมิชชั่น ${Intl.NumberFormat().format(Number(dataSales[8]).toFixed(2))} บาท` : `ค่าคอมมิชชั่น ${Intl.NumberFormat().format(Number(dataSales[7]).toFixed(2))} บาท`}</CardText>
              </div>
              <div style={{width:"10%", justifyContent: 'flex-end', textAlign:"end"}}>
                <Button color='success' style={{width:"80%"}} onClick={() => handleExport()}>Export</Button>
                <CardText className='mb-25'></CardText>
                <Button color='primary' style={{width:"80%"}} onClick={() => handlesubmit()}>Submit</Button>
              </div>
            </div>
          </div>
        </div>
        {/* /Header */}
      </CardBody>

      {/* Invoice Description */}
      <Table innerRef={tableRef} responsive>
        <thead>
          <tr>
            <th className='py-1'>ลำดับที่</th>
            <th className='py-1'>วันที่เอกสาร</th>
            <th className='py-1'>ประเภทเอกสาร</th>
            <th className='py-1'>หมายเลขเอกสาร</th>
            <th className='py-1'>รหัสลูกค้า</th>
            <th className='py-1'>ราคา</th>
            <th className='py-1'>ราคารวม</th>
            <th className='py-1'>ยอดคงเหลือ</th>
            <th className='py-1' >ค่าคอมมิชชั่น</th>
            <th className='py-1' style={{width:"1%"}}><CustomInput inline type='checkbox' id='Checkboxall' checked={checkedall} onChange={handleCheckAll} /></th>
            <th className='py-1' style={{width:"1%"}}></th>
          </tr>
        </thead>
        <tbody>
          {itemRows}
        </tbody>
      </Table>
      {/* /Invoice Description */}

      <Modal
        isOpen={modal}
        toggle={() => toggleModal()}
        className='modal-dialog-centered modal-xl'
        onClosed={() => setFileName('')}
      >
        <ModalHeader toggle={() => toggleModal()}></ModalHeader>
        <ModalBody>
        <Table responsive>
          <thead>
            <tr>
              <th className='py-1' >ลำดับที่</th>
              <th className='py-1' >วันที่เอกสาร</th>
              <th className='py-1' >ประเภทเอกสาร</th>
              <th className='py-1' >หมายเลขเอกสาร</th>
              <th className='py-1' >รหัสลูกค้า</th>
              <th className='py-1' >ราคา</th>
              <th className='py-1' >ราคารวม</th>
              <th className='py-1' >ยอดคงเหลือ</th>
              <th className='py-1' >ค่าคอมมิชชั่น</th>
            </tr>
          </thead>
          <tbody>
            {CommissionLineitemRows}
          </tbody>
        </Table>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={() => toggleModal()}>
            ปิด
          </Button>
        </ModalFooter>
      </Modal>

      {/* Invoice Note */}
      <CardBody className='invoice-padding pt-0'>
        <Row>
          <Col sm='12'>
            {/* <span className='font-weight-bold'>Note: </span>
            <span>
              It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance
              projects. Thank You!
            </span> */}
          </Col>
        </Row>
      </CardBody>
      {/* /Invoice Note */}
    </Card>
    </Fragment>
  ) : null
}

export default PreviewCard
