import axios from 'axios'
import { number } from 'prop-types'

// Get data
export const getData_sales = params => {
  return async dispatch => {
    console.log(params)
    if (params.getinfo === true) {
      await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/GetSalesPersonCommission`, params).then(async function (response) {
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
    } else {
      dispatch({
        type: 'GET_DATA',
        allData: [],
        data: [],
        totalPages: 0,
        params
      })
    }
  }
}