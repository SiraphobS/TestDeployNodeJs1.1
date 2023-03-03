import { Fragment, useState, useEffect } from 'react'
import { AvForm, AvInput } from 'availity-reactstrap-validation-safe'
import { Button, Media, Label, Row, Col, Input, FormGroup, Alert } from 'reactstrap'
import classnames from 'classnames'
import axios from 'axios'
import { Info } from 'react-feather'
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

const GeneralTabs = ({ data }) => {
  const [email, setEmail] = useState(data?.Email ? data.Email : '')
  const [firstname, setFirstname] = useState(data?.Firstname ? data.Firstname : '')
  const [lastname, setLastname] = useState(data?.Lastname ? data.Lastname : '')
  const [phone, setPhone] = useState(data?.Tel ? data.Tel : '')
  const [idCardNumber, setIdCardNumber] = useState(data?.IdCardNumber ? data.IdCardNumber : '')
  const [lineId, setLineId] = useState(data?.LineId ? data.LineId : '')
  const [profileImage, setProfileImage] = useState('')
  const [username, setUsername] = useState(data?.Username ? data.Username : '')
  const [validIdCardNumber, setValidIdCardNumber] = useState(true)
  const [validPhone, setValidPhone] = useState(true)
  const defaultprofileImage = require('@src/assets/images/portrait/small/avatar-s-11.jpg').default

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem('msUserData')).accessToken
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/getProfileImage`, {idCardNumber: data?.IdCardNumber, accessToken}).then(response => {
      if (response.data.name !== 'Error') {
        setProfileImage(response.data)
      }
    })
  }, [])

  const notify = (color, title, message) => toast.info(<InfoToast color={color} title={title} message={message} />, {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true
  })
  const onChangeImage = async (e) => {
      const files = e.target.files
      if (files[0]?.size <= 1000000) {
        const result = await toBase64(files[0]).catch(e => Error(e))
        if (result instanceof Error) {
          console.log('Error: ', result.message)
        } else {
          setProfileImage(result)
          // console.log(result)
          
        }
      } else {
        notify('danger', 'ขนาดไฟล์รูปภาพใหญ่เกินกำหนด', 'ไฟล์ต้องขนาดไม่เกิน 1mb')
      }
  }

  const isFormatIdCardNumber = () => {
    return Boolean(idCardNumber) && /^([0-9]{13})$/.test(String(idCardNumber))
  }

  const isFormatPhone = () => {
    return Boolean(phone) && /^([0-9]{10})$/.test(String(phone))
  }

  const onCLickSaveChange = async () => {
    if (validPhone && validIdCardNumber) {
      const result = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/changeUserInfo`, {
        username,
        idCardNumber,
        lineId,
        phone,
        profileImage
      })

      if (result.data.Result === "Success") {
        notify('success', 'Success', `Change Information Success`)
      } else {
        notify('danger', 'ERROR', 'Error')
      }
    } else {
      console.log("In valid")
    }
  }

  const renderIdCardNumberInValid = () => {
    if (!validIdCardNumber) {
      return (
        <Label className='form-label ml-75 text-danger'>
          ID Card No. ไม่ถูกต้อง
        </Label>
      )
    }
  }

  const renderPhoneInValid = () => {
    if (!validPhone) {
      return (
        <Label className='form-label ml-75 text-danger'>
          เบอร์โทรศัพท์ไม่ถูกต้อง
        </Label>
      )
    }
  }

  return (
    <Fragment>
      <Media>
        <Media className='mr-25' left>
          <Media object className='rounded mr-50' src={profileImage ? profileImage : defaultprofileImage} alt='user image' height='80' width='80' />
        </Media>
        <Media className='mt-75 ml-1' body>
          <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
            Upload
            <Input type='file' onChange={onChangeImage} hidden accept='image/*' />
          </Button.Ripple>
          <p>Allowed JPG, GIF or PNG. Max size of 1MB</p>
        </Media>
      </Media>
      <AvForm className='mt-2' onSubmit={() => onCLickSaveChange()}>
        <Row>
          <Col sm='6'>
            <FormGroup>
              <Label for='username'>Username</Label>
              <AvInput
                id='username'
                name='username'
                value={username}
                placeholder='Username'
                disabled
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label for='name'>Name</Label>
              <AvInput
                id='name'
                name='name'
                value={`${firstname} ${lastname}`}
                placeholder='first name'
                disabled
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label for='general-email'>E-mail</Label>
              <AvInput
                type='email'
                id='general-email'
                name='general-email'
                value={email}
                placeholder='Email'
                disabled
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label for='company'>เลขบัตรประจำตัวประชาชน</Label>
              {renderIdCardNumberInValid()}
              <AvInput
                id='id-card-number'
                name='id-card-number'
                placeholder='เลขบัตรประจำตัวประชาชน'
                value={idCardNumber}
                required
                onChange={e => { setIdCardNumber(e.target.value) }}
                onBlur={() => setValidIdCardNumber(isFormatIdCardNumber())}
                className={classnames({ 'border-danger': !validIdCardNumber })}
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label for='company'>Line ID</Label>
              <AvInput
                id='lineId'
                name='lineId'
                placeholder='Line ID'
                value={lineId}
                onChange={e => { setLineId(e.target.value) }}
                required
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
                <Label for='company'>Phone</Label>
                {renderPhoneInValid()}
                <AvInput
                  id='phone'
                  name='phone'
                  placeholder='Phone'
                  value={phone}
                  onChange={e => { setPhone(e.target.value) }}
                  required
                  onBlur={() => setValidPhone(isFormatPhone())}
                  className={classnames({ 'border-danger': !validPhone })}
                />
              </FormGroup>
          </Col>
          <Col sm='12'>
            <FormGroup>
              <Label for='bio'>Address</Label>
              <Input
                id='address'
                type='textarea'
                rows='3'
                placeholder='Address'
              />
            </FormGroup>
          </Col>
          <Col className='mt-75' sm='12'>
            <Alert className='mb-50' color='warning'>
              <h4 className='alert-heading'>Your email is not confirmed. Please check your inbox.</h4>
              <div className='alert-body'>
                <a href='/' className='alert-link' onClick={e => e.preventDefault()}>
                  Resend confirmation
                </a>
              </div>
            </Alert>
          </Col>
          <Col className='mt-2' sm='12'>
            <Button.Ripple className='mr-1' color='primary'>
              Save changes
            </Button.Ripple>
            <Button.Ripple color='secondary' outline>
              Cancel
            </Button.Ripple>
          </Col>
        </Row>
      </AvForm>
    </Fragment>
  )
}

export default GeneralTabs
