import { useState } from 'react'
import { CardBody, Button, Card, Spinner} from 'reactstrap'
import { FileText } from 'react-feather'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import * as excelService from '../../../services/excelService'

const Warehouse = () => {

  const [isLoadingActualReport, setIsLoadingActualReport] = useState(false)
  const [isLoadingReturnReport, setIsLoadingReturnReport] = useState(false)
  const [isLoadingSafetyReport, setIsLoadingSafetyReport] = useState(false)

  const onClickDownloadReport = async (route, fileName, setIsLoading) => {
    const url = `${process.env.REACT_APP_API_ENDPOINT}/${route}`
    console.log("url: ", url)
    setIsLoading(true)
    await axios.get(url).then(async function(response) {
      const date = new Date()
      fileName = `${fileName}_${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
      excelService.convertJsonToExcel(response.data, route, fileName)
    })
    setIsLoading(false)
  }

  return (
    <div>
      <Card className='w-100 py-2'>
        <CardBody>
          <Card>
            <div style={{ borderBottomStyle: 'solid', borderWidth: 'thin' }} className='pb-75 d-flex align-items-center justify-content-between'>
              <div className='d-flex align-items-center'>
                <FileText className='mr-75' size={28}/>
                <h4 className='font-weight-light mb-0'>Actual Stock</h4>
                <p className='mb-0 ml-25 mr-75'>(รายงานสรุปยอดสินค้าประจำวัน)</p>
                <Spinner hidden={!isLoadingActualReport} color='primary' />
              </div>
              <Button.Ripple onClick={() => onClickDownloadReport('getstockonline', 'รายงานสรุปยอดสินค้าประจำวัน', setIsLoadingActualReport)} color='primary'>Download</Button.Ripple>
            </div>
          </Card>
          <Card>
            <div style={{ borderBottomStyle: 'solid', borderWidth: 'thin' }} className='pb-75 d-flex align-items-center justify-content-between'>
              <div className='d-flex align-items-center'>
                <FileText className='mr-75' size={28}/>
                <h4 className='font-weight-light mb-0'>Safety Stock</h4>
                <p className='mb-0 ml-25 mr-75'>(รายงานสรุปสินค้าคงเหลือ)</p>
                <Spinner hidden={!isLoadingSafetyReport} color='primary' />
              </div>
              <Button.Ripple onClick={() => onClickDownloadReport('getsaftystock', 'รายงานสรุปสินค้าคงเหลือ', setIsLoadingSafetyReport)} color='primary'>Download</Button.Ripple>
            </div>
          </Card>
          <Card>
            <div style={{ borderBottomStyle: 'solid', borderWidth: 'thin' }} className='pb-75 d-flex align-items-center justify-content-between'>
              <div className='d-flex align-items-center'>
                <FileText className='mr-75' size={28}/>
                <h4 className='font-weight-light mb-0'>Return Order Stock</h4>
                <p className='mb-0 ml-25 mr-75'>(รายงานสรุปการคืนสินค้า)</p>
                <Spinner hidden={!isLoadingReturnReport} color='primary' />
              </div>
              <Button.Ripple onClick={() => onClickDownloadReport('getreturnorder', 'รายงานสรุปการคืนสินค้า', setIsLoadingReturnReport)} color='primary'>Download</Button.Ripple>
            </div>
          </Card>
        </CardBody>
      </Card>
    </div>
  )
}

export default Warehouse
