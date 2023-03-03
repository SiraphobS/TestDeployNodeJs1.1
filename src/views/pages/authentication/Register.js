import { Fragment, useState, useContext, useEffect } from 'react'
import classnames from 'classnames'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { handleLogin } from '@store/actions/auth'
import { Link, useHistory } from 'react-router-dom'
import { AbilityContext } from '@src/utility/context/Can'
import InputPasswordToggle from '@components/input-password-toggle'
import { Facebook, Twitter, Mail, GitHub, Info, CheckCircle } from 'react-feather'
import { AvForm, AvInput, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation-safe'
import { Row, Col, InputGroup, InputGroupAddon, Input, InputGroupText, FormGroup, Label, Button, CustomInput } from 'reactstrap'
import axios from 'axios'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'

import '@styles/base/pages/page-auth.scss'
import { invalid } from 'moment'

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

const Register = () => {
  const ability = useContext(AbilityContext)

  const [skin, setSkin] = useSkin()

  const history = useHistory()

  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [inValidInput, setInvalidInput] = useState({})
  const [errors, setErrors] = useState({})
  const [validFirstName, setValidFirstName] = useState(true)
  const [validLastName, setValidLastName] = useState(true)
  const [validUserName, setValidUserName] = useState(true)
  const [validPhone, setValidPhone] = useState(true)
  const [validIdCardNumber, setValidIdCardNumber] = useState(true)
  const [validEmail, setValidEmail] = useState(true)
  const [isInternalEmail, setIsInternalEmail] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [terms, setTerms] = useState(false)
  const [lineId, setLineId] = useState('')
  const [idCardNumber, setIdCardNumber] = useState('')
  const [rexPassword, setRexPassword] = useState('')

  useEffect(() => {
    setUsername(email)
  }, [email])

  useEffect(() => {
    setUsername('')
    setEmail('')
    setValidEmail(true)
    setValidUserName(true)
  }, [isInternalEmail])

  const sourceHome = require(`@src/assets/images/pages/logo-250x65.jpg`).default
  const imgCompany = require(`@src/assets/images/pages/COMPANY.jpg`).default

  const Terms = () => {
    return (
      <Fragment>
        I agree to
        <a className='ml-25' href='/' onClick={e => e.preventDefault()}>
          privacy policy & terms
        </a>
      </Fragment>
    )
  }

  const notify = (color, title, message) => toast.info(<InfoToast color={color} title={title} message={message} />, {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true
  })

  const getRexPassword = async () => {
    await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/RexPassword`)
      .then(async function (response) {
        console.log(response.data.Result)
        await setRexPassword(response.data.Result)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  if (!rexPassword) {
    getRexPassword()
  }

  const handleUsernameChange = e => {
    const errs = errors
    if (errs.username) delete errs.username
    setUsername(e.target.value)
    setErrors(errs)
  }

  const handleFirstnameChange = e => {
    const errs = errors
    if (errs.firstname) delete errs.firstname
    setFirstname(e.target.value)
    setErrors(errs)
  }

  const handleLastnameChange = e => {
    const errs = errors
    if (errs.lastname) delete errs.lastname
    setLastname(e.target.value)
    setErrors(errs)
  }

  const isFormatName = name => {
    return Boolean(name) && /^([A-Za-zก-๏]+)$/.test(String(name))
  }
  const isFormatEmail = () => {
    let regexEmail
    if (isInternalEmail) {
      regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))$/
    } else {
      regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
    return Boolean(email) && regexEmail.test(String(email).toLowerCase())
  }

  const isFormatUsername = () => {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return Boolean(username) && regexEmail.test(String(username))
  }

  const isFormatPhoneNo = () => {
    return Boolean(phoneNo) && /^([0-9]{10})$/.test(String(phoneNo))
  }

  const isFormatIdCardNumber = () => {
    return Boolean(idCardNumber) && /^([0-9]{13})$/.test(String(idCardNumber))
  }

  const validatePassword = e => {
    console.log("e.target.value", e.target.value)
    if (rexPassword.length) {
      const rexPasswordData = rexPassword

      rexPassword.map((row, index) => {
        console.log("row", row.REGULAR)
        const re = new RegExp(row.REGULAR, "gm")
        console.log(`test ${index}`, e.target.value.match(re))
        if (e.target.value.match(re)) {
          rexPasswordData[index].valid = true
        } else {
          rexPasswordData[index].valid = false
        }
      })
      setPassword(e.target.value)
      setRexPassword(rexPasswordData)

    }
  }

  const renderEmailInput = () => {
    if (isInternalEmail) {
      return (
        <InputGroupAddon addonType='append'>
          <InputGroupText>@tirawatgroup.com</InputGroupText>
        </InputGroupAddon>
      )
    }
  }

  const handleSubmit = async (event, errors) => {
    setValidFirstName(isFormatName(firstname))
    setValidLastName(isFormatName(lastname))
    setValidPhone(isFormatPhoneNo())
    setValidIdCardNumber(isFormatIdCardNumber())
    setValidUserName(isFormatUsername())
    setValidEmail(isFormatEmail())
    if (validFirstName && validLastName && validPhone && validEmail && validIdCardNumber && (validUserName || isInternalEmail) && terms) {
      const data = {
        username,
        password,
        firstname,
        lastname,
        phoneNo,
        email,
        idCardNumber,
        lineId
      }

      if (isInternalEmail) {
        data.email = `${email}@tirawatgroup.com`
      }

      console.log("data", data)
      // useJwt
      //   .register({ username, email, password })
      //   .then(res => {
      //     if (res.data.error) {
      //       const arr = {}
      //       for (const property in res.data.error) {
      //         if (res.data.error[property] !== null) arr[property] = res.data.error[property]
      //       }
      //       setErrors(arr)
      //       if (res.data.error.email !== null) console.error(res.data.error.email)
      //       if (res.data.error.username !== null) console.error(res.data.error.username)
      //     } else {
      //       setErrors({})
      //       const data = { ...res.data.user, accessToken: res.data.accessToken }
      //       ability.update(res.data.user.ability)
      //       dispatch(handleLogin(data))
      //       history.push('/')
      //     }
      //   })
      //   .catch(err => console.log(err))

      await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/Register`, data)
        .then(async function (response) {
          console.log(response)

          if (response.data[0].Result === 'User duplicate') {
            notify('danger', 'Duplicate User', `Duplicate User ${username} Create Not Success`)
          } else {
            notify('success', 'Success', `Create User ${username} Success`)
            history.push("/login")
          }


          // 

          //  if (response.data.status === 'fail') {
          //     this.dialogApp.showDialogFail("", response.data.message, () => { })
          //      this.setState({ isLoading: false })
          //  } else {
          //      this.setState({ isLoading: false })
          //      setCookie(keys.IS_LOGIN, true, 1)
          //      setCookie(keys.TOKEN, response.data.token, 1)
          //      setCookie(keys.USERDETAIL, JSON.stringify(response.data), 1)
          //      this.props.actionLogin(response.data)

          //      this.props.history.replace('/')
          //  }

        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      notify('danger', 'Incomplete Information', 'Please check your input')
    }
  }

  const renderNameInValid = (isNameValid) => {
    if (!isNameValid) {
      return (
        <Label className='form-label ml-75 text-danger'>
          ภาษาไทยและ a-z, A-Z เท่านั้น
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
  const renderIdCardNumberInValid = () => {
    if (!validIdCardNumber) {
      return (
        <Label className='form-label ml-75 text-danger'>
          ตัวเลข 13 หลัก
        </Label>
      )
    }
  }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner'>
        <Col className='d-none d-lg-flex align-items-center auth-bg' lg='8' sm='12'>
          <img className='img-fluid xl-10' src={imgCompany} alt='Company building' style={{width:"100%", height:"100%" }}/>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <img src={sourceHome} alt='Logo'/>
            <AvForm action='/' className='auth-register-form mt-2' onSubmit={handleSubmit}>
            <FormGroup>
                <Label className='form-label' for='register-firstname'>
                  ชื่อ / Firstname
                </Label>
                {renderNameInValid(validFirstName)}
                <AvInput
                  autoFocus
                  required
                  type='text'
                  placeholder='Firstname'
                  id='register-firstname'
                  name='register-firstname'
                  value={firstname}
                  onChange={handleFirstnameChange}
                  onBlur={() => setValidFirstName(isFormatName(firstname)) }
                  className={classnames({ 'border-danger': !validFirstName })}
                />
                {Object.keys(errors).length && errors.firstname ? (
                  <small className='text-danger'>{errors.firstname}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-lastname'>
                  นามสกุล / Lastname
                </Label>
                {renderNameInValid(validLastName)}
                <AvInput
                  required
                  type='text'
                  placeholder='Lastname'
                  id='register-lastname'
                  name='register-lastname'
                  value={lastname}
                  onChange={handleLastnameChange}
                  onBlur={() => setValidLastName(isFormatName(lastname))}
                  className={classnames({ 'border-danger': !validLastName })}
                />
                {Object.keys(errors).length && errors.lastname ? (
                  <small className='text-danger'>{errors.lastname}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-email'>
                  ประเภทผู้ใช้งาน / User Type
                </Label>
                <div className='user-type'>
                  <CustomInput onClick={() => { setIsInternalEmail(true) }} className='custom-control-info' type='radio' id='userInternalRadio' name='userTypeRadio' inline label='Internal' defaultChecked />
                  <CustomInput onClick={() => { setIsInternalEmail(false) }} className='custom-control-info ml-75' type='radio' id='userExternalRadio2' name='userTypeRadio' inline label='External' />
                </div>
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-email'>
                  อีเมล / Email
                </Label>
                <InputGroup className='mb-2'>
                  <AvInput
                    required
                    type={isInternalEmail ? 'text' : 'email'}
                    id='register-email'
                    name='register-email'
                    value={email}
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)}
                    onBlur={() => setValidEmail(isFormatEmail())}
                    className={!validEmail ? 'border-danger' : null}
                  />
                  {renderEmailInput()}
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-username'>
                  ชื่อบัญชีผู้ใช้งาน / Username
                </Label>
                <AvInput
                  required
                  disabled
                  type='text'
                  placeholder=''
                  id='register-username'
                  name='register-username'
                  value={username}
                  onChange={handleUsernameChange}
                />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-phone'>
                  เบอร์โทรศัพท์ / Phone Number
                </Label>
                {renderPhoneInValid()}
                <AvInput
                  required
                  type='text'
                  maxLength='10'
                  placeholder='Phone Number'
                  id='register-phone'
                  name='register-phone'
                  value={phoneNo}
                  onChange={e => setPhoneNo(e.target.value)}
                  onBlur={() => setValidPhone(isFormatPhoneNo())}
                  className={classnames({ 'border-danger': !validPhone })}
                />
                {Object.keys(errors).length && errors.phoneNo ? (
                  <small className='text-danger'>{errors.phoneNo}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-idCardNumber'>
                  เลขบัตรประจำตัวประชาชน / ID Card No.
                </Label>
                {renderIdCardNumberInValid()}
                <AvInput
                  type='text'
                  placeholder='ID Card No.'
                  id='id-card-number'
                  name='id-card-number'
                  value={idCardNumber}
                  onBlur={() => setValidIdCardNumber(isFormatIdCardNumber())}
                  onChange={e => setIdCardNumber(e.target.value)}
                  className={classnames({ 'border-danger': !validIdCardNumber })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-lineId'>
                  ไลน์ / Line ID
                </Label>
                <AvInput
                  type='text'
                  placeholder='Line ID'
                  id='line-id'
                  name='line-id'
                  value={lineId}
                  onChange={e => setLineId(e.target.value)}
                />
              </FormGroup>
              <AvCheckboxGroup name='Remember Me' checked={terms} required>
                <AvCheckbox
                  customInput
                  type='checkbox'
                  id='remember-me'
                  value='Remember Me'
                  label={<Terms />}
                  className='custom-control-Primary'
                  onChange={e => setTerms(e.target.checked)}
                />
              </AvCheckboxGroup>
              <Button.Ripple
                block
                color='primary'
                disabled={!phoneNo || !email || !username || !terms || !firstname || !lastname || !idCardNumber}
              >
                Sign up
              </Button.Ripple>
            </AvForm>
            <p className='text-center mt-2'>
              <span className='mr-25'>Already have an account?</span>
              <Link to='/login'>
                <span>Sign in instead</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Register
