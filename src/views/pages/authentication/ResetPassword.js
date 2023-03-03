import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { AvForm } from 'availity-reactstrap-validation-safe'
import InputPassword from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, FormGroup, Label, Button } from 'reactstrap'
import { isUserLoggedIn, getUserData } from '@utils'
import '@styles/base/pages/page-auth.scss'

const ResetPassword = props => {
  const [passwordNew, setPasswordNew] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [userData, setuserData] = useState(null)
  const history = useHistory()
  const sourceHome = require(`@src/assets/images/pages/logo-250x65.jpg`).default

  useEffect(() => {
    if (isUserLoggedIn() && getUserData().IsGeneratePassword) {
      setuserData(getUserData())
      localStorage.removeItem('userData')
    } else {
      history.push("/")
    }
  }, [])

  const handleSubmit = async (event, errors) => {
    if (passwordNew && passwordConfirm && (passwordNew === passwordConfirm)) {
      const dataChange = {
        username: userData.Username,
        passwordNew
      }
      await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/ResetPassword`, dataChange).then(async function (response) {
        if (response.data[0].Result === '1') {
          userData.IsGeneratePassword = false
          localStorage.setItem('userData', JSON.stringify(userData))
          history.push('/')
        } else {
          notify('danger', 'ERROR', 'Please go to account-setting page to reset your password')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2'>
        <Card className='mb-0'>
          <CardBody>
            <CardTitle className='brand-logo'>
              <img src={sourceHome} alt='Logo'/>
            </CardTitle>
            <CardTitle tag='h4' className='mb-1'>
              ตั้งรหัสผ่าน / Reset Password 🔒
            </CardTitle>
            <AvForm className='auth-reset-password-form mt-2' onSubmit={handleSubmit}>
              <FormGroup>
                <Label className='form-label' for='new-password'>
                  รหัสใหม่ / New Password
                </Label>
                <InputPassword onChange={e => setPasswordNew(e.target.value)} className='input-group-merge' id='new-password' autoFocus />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='confirm-password'>
                  ยืนยันรหัสใหม่ / Confirm Password
                </Label>
                <InputPassword onChange={e => setPasswordConfirm(e.target.value)} className='input-group-merge' id='confirm-password' />
              </FormGroup>
              <Button.Ripple disabled={!passwordNew || !passwordConfirm || (passwordNew !== passwordConfirm)} color='primary' block>
                ตกลง / Submit
              </Button.Ripple>
            </AvForm>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default ResetPassword
