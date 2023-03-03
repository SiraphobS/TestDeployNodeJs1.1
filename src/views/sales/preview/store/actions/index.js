import axios from 'axios'
import { number } from 'prop-types'

// Get data
export const getData_sales_Line = params => {
    return async dispatchComLine => {
        await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/GetCommission`, params.data).then(async function (response) {
            dispatchComLine({
                type: 'GET_DATA',
                allData: response.data,
                data: response.data.slice((params.page - 1) * 10, params.page * 10),
                totalPages: response.data.length,
                params
            })
        })
        .catch(function (error) {
            console.log(error)
        })
    }
}