import {  useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'
import { Table, CardTitle, Spinner } from 'reactstrap'

import Moment from 'moment'

// ** Expandable table component
const ExpandableTable = ({ data }) => {

  const DataPostCommissionLineItem = ({
    document_no: data["Document No_"]
  })
  const [loadingData, setLoadingData] = useState(true)
  const [CommissionLineitemRows, setCommissionLineitemRows] = useState([])

  useEffect(() => {
    async function getData() {
      axios.post(`${process.env.REACT_APP_API_ENDPOINT}/GetCommissionLineItem`, DataPostCommissionLineItem).then(function (response) {
        for (let index = 0; index < response.data.length; index++) {
          const row = (
            <tr key={index}>
              <td className='py-1'>
                <span className='font-weight-bold'>{response.data[index]["Item No."]}</span>
              </td>
              <td className='py-1'>
                <span className='font-weight-bold'>{response.data[index]["Brand"]}</span>
              </td>
              <td className='py-1'>
                <span className='font-weight-bold'>{response.data[index]["Item Category Code"]}</span>
              </td>
              <td className='py-1'>
                <span className='font-weight-bold'>{response.data[index]["Description"]}</span>
              </td>
              <td className='py-1'>
                <span className='font-weight-bold'>{response.data[index]["Quantity"]}</span>
              </td>
              <td className='py-1'>
                <span className='font-weight-bold'>{Intl.NumberFormat().format(Number(response.data[index]["Amount"]).toFixed(2))} บาท</span>
              </td>
              <td className='py-1'>
                <span className='font-weight-bold'>{Intl.NumberFormat().format(Number(response.data[index]["Amount Including VAT"]).toFixed(2))} บาท</span>
              </td>
            </tr>
          )
          CommissionLineitemRows.push(row)
        }
        setLoadingData(false)
      })
      .catch(function (error) {
        console.log(error)
      })
    }
    if (loadingData) {
      getData()
    }
  }, [])

  return (
      <div className='expandable-content p-2' style={{ marginLeft: '5rem', marginRight: '5rem', marginTop: '0.8rem'}}>
        {loadingData ? (
            <Spinner color='primary' />
        ) : (
          <div>
            <CardTitle tag='h4'>รายละเอียดสินค้าหมายเลขเอกสาร {data["Document No_"]}</CardTitle>
            <Table size='sm' hover responsive>
              <thead>
                <tr>
                  <th>Item No.</th>
                  <th>Brand</th>
                  <th>Cate</th>
                  <th>Description</th>
                  <th>จำนวน</th>
                  <th>ราคาไม่รวม VAT</th>
                  <th>ราคารวม VAT</th>
                </tr>
              </thead>
              <tbody>
                {CommissionLineitemRows}
              </tbody>
            </Table>
          </div>
        )}
      </div>
  )
}

export default ExpandableTable
