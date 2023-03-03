import { isUserLoggedIn } from '@utils'
import { useSkin } from '@hooks/useSkin'
import { ChevronLeft, Info } from 'react-feather'
import { Link, Redirect } from 'react-router-dom'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import { Fragment, useState } from 'react'
import { AvForm, AvInput } from 'availity-reactstrap-validation-safe'
import axios from 'axios'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'

const InfoToast = ({ color, title, message }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color={color} icon={<Info size={12} />} />
        <h6 className={`ml-50 mb-0 text-${color}`}>{title}</h6>
      </div>
      {/* <small className='text-muted'>11 Min Ago</small> */}
    </div>
    <div className='toastify-body'>
      <span>{message}</span>
    </div>
  </Fragment>
)

const ForgotPassword = () => {
  const [skin, setSkin] = useSkin()
  const [email, setEmail] = useState('')

  const illustration = skin === 'dark' ? 'forgot-password-v2-dark.svg' : 'forgot-password-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default
  const imgCompany = require(`@src/assets/images/pages/COMPANY.jpg`).default
  const notify = (color, title, message) => toast.info(<InfoToast color={color} title={title} message={message} />, {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true
  })
  const handleSubmit = async (event, errors) => {
    if (errors && !errors.length) {

      const data = {
        email
      }

      console.log("data", data)

      await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/ForgotPassword`, data)
        .then(async function (response) {
          console.log(response)
          if (response.data[0].Result === '1') {
            notify('success', 'Success', `รหัสถูกส่งเรียบร้อยแล้ว`)
          } else {
            notify('danger', 'ERROR', 'ไม่พบอีเมลนี้ในระบบ')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  if (!isUserLoggedIn()) {
    return (
      <div className='auth-wrapper auth-v2'>
        <Row className='auth-inner'>
          <Col className='d-none d-lg-flex align-items-center auth-bg' lg='8' sm='12'>
            <img className='img-fluid xl-10' src={imgCompany} alt='Company building' style={{width:"100%", height:"100%" }}/>
          </Col>
          <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
            <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
              <CardTitle tag='h2' className='font-weight-bold mb-1'>
                Forgot Password? 🔒
              </CardTitle>
              <AvForm className='auth-forgot-password-form mt-2' onSubmit={handleSubmit}>
                {/* <FormGroup>
                  <Label className='form-label' for='login-email'>
                    Email
                  </Label>
                  <Input
                    type='email'
                    id='login-email'
                    placeholder='Input Email' 
                    autoFocus
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </FormGroup> */}
                <FormGroup>
                  <Label className='form-label' for='login-email'>
                    อีเมล / Email
                </Label>
                  <AvInput
                    autoFocus
                    type='email'
                    value={email}
                    id='login-email'
                    name='login-email'
                    placeholder='Input Email'
                    onChange={e => setEmail(e.target.value)}
                  />
                </FormGroup>
                <Button.Ripple color='primary' block disabled={!email.length}>
                  Send new password
                </Button.Ripple>
              </AvForm>
              <p className='text-center mt-2'>
                <Link to='/login'>
                  <ChevronLeft className='mr-25' size={14} />
                  <span className='align-middle'>Back to login</span>
                </Link>
              </p>
            </Col>
          </Col>
        </Row>
      </div>
    )
  } else {
    return <Redirect to='/' />
  }
}

export default ForgotPassword
