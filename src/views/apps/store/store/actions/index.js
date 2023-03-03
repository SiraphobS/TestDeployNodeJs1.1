import axios from 'axios'
import { number } from 'prop-types'

// Get data
export const getData_sotre = params => {
  return async dispatch => {
    // await axios.get('/apps/invoice/invoices', params).then(response => {
    //   console.log('------------------- Start response.data --------------------')
    //   console.log(response.data)
    //   console.log('------------------- End response.data --------------------')

    //   dispatch({
    //     type: 'GET_DATA',
    //     allData: response.data.allData,
    //     data: response.data.invoices,
    //     totalPages: response.data.total,
    //     params
    //   })
    // })
    await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/GetStore`).then(async function (response) {
      console.log(response.data)
      dispatch({
        type: 'GET_DATA',
        allData: response.data,
        data: response.data.slice((params.page - 1) * params.page, ((params.page - 1) * params.page) + 10),
        totalPages: response.data.length,
        params
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}