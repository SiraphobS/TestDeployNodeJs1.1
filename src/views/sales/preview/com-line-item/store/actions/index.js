import axios from 'axios'
import { number } from 'prop-types'

// Get data
export const getData_sales_Line_Item = params => {
    return async dispatchComLineItem => {
        await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/GetCommissionLineItem`, params.Data["Document No_"]).then(function (response) {
            dispatchComLineItem({
                type: 'GET_DATA',
                Data: response.data
            })
        })
        .catch(function (error) {
            console.log(error)
        })
    }
}