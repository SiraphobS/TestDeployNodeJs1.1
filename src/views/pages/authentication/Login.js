import { useState, useContext, Fragment } from 'react'
import Avatar from '@components/avatar'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { toast, Slide } from 'react-toastify'
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { getHomeRouteForLoggedInUser } from '@utils'
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee, Info } from 'react-feather'
import { AvForm, AvInput } from 'availity-reactstrap-validation-safe'
import {
  Alert,
  Row,
  Col,
  CardTitle,
  CardText,
  FormGroup,
  Label,
  CustomInput,
  Button,
  UncontrolledTooltip
} from 'reactstrap'
import axios from 'axios'
import jwt from 'jsonwebtoken'

import '@styles/base/pages/page-auth.scss'

import { version } from '../../../App'

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

const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'>Welcome, {name}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>You have successfully logged in as an {role} user to VivaPerfect. Now you can start to explore. Enjoy!</span>
    </div>
  </Fragment>
)

const CookieToast = () => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='info' icon={<Info size={12} />} />
        <h6 className='text-info ml-50 mb-0'>Sticky Toast!</h6>
      </div>
      <small className='text-muted'>11 Min Ago</small>
    </div>
    <div className='toastify-body'>
      <span>Candy jelly-o apple pie chocolate bar croissant gummies tiramisu macaroon.</span>
    </div>
  </Fragment>
)

const Login = props => {
  const [skin, setSkin] = useSkin()
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState('admin@demo.com')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [policy, setPolicy] = useState('')
  const [showPolicy, setShowPolicy] = useState(true)
  const [ip, setIP] = useState('')
  const [versionbackend, setversionbackend] = useState('')

  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/COMPANY.jpg`).default
  const illustration1 = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    sourceHome = require(`@src/assets/images/pages/logo-250x65.jpg`).default

  const msIcon = require(`@src/assets/images/icons/microsoft.png`).default
  const jwtConfig = {
    secret: 'dd5f3089-40c3-403d-af14-d0c228b05cb4',
    refreshTokenSecret: '7c4c1c50-3230-45bf-9eae-c9b2e401c767',
    expireTime: '10m',
    refreshTokenExpireTime: '10m'
  }

  const notify = (color, title, message) => toast.info(<InfoToast color={color} title={title} message={message} />, {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true
  })

  // toast.info(<CookieToast />, {
  //   autoClose: false,
  //   hideProgressBar: true,
  //   position: toast.POSITION.BOTTOM_CENTER,
  //   closeOnClick: false
  // })

  const loginByMs = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/loginMicrosoft`)
      console.log('response: ', response.data)
      window.location = response.data
    } catch (err) {
      console.log('err: ', err.message)
    }
  }

  const getCheckConnect = async () => {
    await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/CheckConnect`)
      .then(async function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })

  }
  // getTestBoss()

  // getCheckConnect()

  const getvarsionbackend = async () => {
    await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/Version`)
      .then(async function (response) {
        console.log(response)
        setversionbackend(response.data.Result)
      })
      .catch(function (error) {
        console.log(error)
      })

  }
  // getTestBoss()

  getvarsionbackend()

  const getPolicy = async () => {

    await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/Policy`)
      .then(async function (response) {
        // console.log(response)
        setPolicy(response.data.Result)
      })
      .catch(function (error) {
        // console.log(error)
      })

  }

  if (policy === '') {
    getPolicy()
  }

  const getIP = async () => {

    // await axios.get(`https://api.ipify.org/?format=json`)
    //   .then(async function (response) {
    //     console.log(response)
    //     setIP(response.data.ip)
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })

  }

  // if (ip === '') {
  //   getIP()
  // }

  const cookieConsent = async () => {

    setShowPolicy(false)

    const data = {
      ipaddress: '0.0.0.0'
    }

    await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/LogLoginGuest`, data)
      .then(async function (response) {
        // console.log(response)
      })
      .catch(function (error) {
        // console.log(error)
      })

    // console.log("id", ip)

  }

  const handleSubmit = async (event, errors) => {
    if (errors && !errors.length) {

      const dataLogin = {
        username,
        password
      }

      // notify('danger', 'ERROR', 'Username or Password not Match')
      // useJwt
      //   .login({ email, password })
      //   .then(res => {
      //     const data = { ...res.data.userData, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken }
      //     dispatch(handleLogin(data))
      //     ability.update(res.data.userData.ability)
      //     history.push(getHomeRouteForLoggedInUser(data.role))
      //     toast.success(
      //       <ToastContent name={data.fullName || data.username || 'John Doe'} role={data.role || 'admin'} />,
      //       { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      //     )
      //   })
      //   .catch(err => console.log(err))

      await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/VerifyAuth`, dataLogin)
        .then(async function (response) {
          console.log(response)

          if (response.data.Auth === "Success") {
            const accessToken = jwt.sign({ username: response.data.username }, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })
            const refreshToken = jwt.sign({ username: response.data.username }, jwtConfig.refreshTokenSecret, {
              expiresIn: jwtConfig.refreshTokenExpireTime
            })

            const data = { ...response.data, accessToken, refreshToken, ability :[{action: 'manage', subject: 'all'}] }
            dispatch(handleLogin(data))
            ability.update([
              {
                action: 'manage',
                subject: 'all'
              }
            ])
            // history.push(getHomeRouteForLoggedInUser('admin'))
            toast.success(
              <ToastContent name={data.fullName || data.Firstname || 'John Doe'} role={data.role || 'admin'} />,
              { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
            loginByMs()
          } else {
            notify('danger', 'ERROR', 'Username or Password not Match')
          }

        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          {/* <svg viewBox='0 0 139 95' version='1.1' height='28'>
            <defs>
              <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                <stop stopColor='#000000' offset='0%'></stop>
                <stop stopColor='#FFFFFF' offset='100%'></stop>
              </linearGradient>
              <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
                <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                <stop stopColor='#FFFFFF' offset='100%'></stop>
              </linearGradient>
            </defs>
            <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
              <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                <g id='Group' transform='translate(400.000000, 178.000000)'>
                  <path
                    d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                    id='Path'
                    className='text-primary'
                    style={{ fill: 'currentColor' }}
                  ></path>
                  <path
                    d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                    id='Path'
                    fill='url(#linearGradient-1)'
                    opacity='0.2'
                  ></path>
                  <polygon
                    id='Path-2'
                    fill='#000000'
                    opacity='0.049999997'
                    points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                  ></polygon>
                  <polygon
                    id='Path-2'
                    fill='#000000'
                    opacity='0.099999994'
                    points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                  ></polygon>
                  <polygon
                    id='Path-3'
                    fill='url(#linearGradient-2)'
                    opacity='0.099999994'
                    points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                  ></polygon>
                </g>
              </g>
            </g>
          </svg> */}
        </Link>
        <Col className='d-none d-lg-flex align-items-center auth-bg' lg='8' sm='12'>
            <img className='img-fluid xl-10' src={source} alt='Login V2' style={{width:"100%", height:"100%" }}/>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            {/* <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Welcome to VivaPerfect! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText> */}
            <img src={sourceHome} alt='Logo'/>
            {/* <Alert color='primary'>
              <div className='alert-body font-small-2'>
                <p>
                  <small className='mr-50'>
                    <span className='font-weight-bold'>Admin:</span> admin@demo.com | admin
                  </small>
                </p>
                <p>
                  <small className='mr-50'>
                    <span className='font-weight-bold'>Client:</span> client@demo.com | client
                  </small>
                </p>
              </div>
              <HelpCircle
                id='login-tip'
                className='position-absolute'
                size={18}
                style={{ top: '10px', right: '10px' }}
              />
              <UncontrolledTooltip target='login-tip' placement='left'>
                This is just for ACL demo purpose.
              </UncontrolledTooltip>
            </Alert> */}
            <AvForm className='auth-login-form mt-2' onSubmit={handleSubmit}>
              {/* <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <AvInput
                  required
                  autoFocus
                  type='email'
                  value={email}
                  id='login-email'
                  name='login-email'
                  placeholder='john@example.com'
                  onChange={e => setEmail(e.target.value)}
                />
              </FormGroup> */}
              <FormGroup>
                <Label className='form-label' for='login-username'>
                  Username
                </Label>
                <AvInput
                  required
                  autoFocus
                  type='text'
                  value={username}
                  id='login-username'
                  name='login-username'
                  placeholder='Username'
                  onChange={e => setUsername(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/forgot-password'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <InputPasswordToggle
                  required
                  tag={AvInput}
                  value={password}
                  id='login-password'
                  name='login-password'
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me' />
              </FormGroup>
              <Button.Ripple color='primary' block disabled={!username.length || !password.length}>
                Sign in
              </Button.Ripple>
              {/* <Link to="/home" className="btn btn-primary">Sign up</Link> */}
            </AvForm>
            <p className='text-center mt-2'>
              <span className='mr-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p>
            {/* <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
            <div className='auth-footer-btn d-flex justify-content-center'>
              <Button.Ripple color='github' onClick={() => loginByMs()}>
                <img src={msIcon} alt='msIcon'/>
              </Button.Ripple>
            </div> */}
            <footer>
              <p className='text-right mt-2'>
                <span className='mr-25' style={{color:"white"}}>{version}</span>
              </p>
              <p className='text-right mt-2'>
                <span className='mr-25' style={{color:"white"}}>{versionbackend}</span>
              </p>
            </footer>
          </Col>
        </Col>
      </Row>
      {showPolicy && policy && (<div className='auth-cookie-consent'>
        <div className='auth-cookie-consent-content'>
          <p style={{ color: 'white' }}>{policy}</p>
          <Button.Ripple color='primary' block onClick={() => cookieConsent()}>
            ยอมรับ
          </Button.Ripple>
        </div>
      </div>)}
    </div>
  )
}

export default Login
