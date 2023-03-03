import { FormGroup, Row, Col, Button } from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import { AvForm, AvInput } from 'availity-reactstrap-validation-safe'
import { useEffect, useState, Fragment } from 'react'
// ** Utils
import { isUserLoggedIn } from '@utils'
// ** Store & Actions
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Info } from 'react-feather'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'
import { Redirect } from 'react-router-dom'

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

const PasswordTabContent = ({data}) => {
  // ** Store Vars
  const dispatch = useDispatch()

  // ** State
  const [userData, setUserData] = useState(null)
  const [password, setPassword] = useState('')
  const [passwordNew, setPasswordNew] = useState('')
  const [passwordNewConfirm, setPasswordNewConfirm] = useState('')

  //** ComponentDidMount
  useEffect(() => {
    // if (isUserLoggedIn() !== null) {
    //   setUserData(JSON.parse(localStorage.getItem('userData')))
    // }
  }, [])

  const notify = (color, title, message) => toast.info(<InfoToast color={color} title={title} message={message} />, {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true
  })

  const handleSubmit = async (event, errors) => {
    if (errors && !errors.length) {

      const dataChange = {
        username: data.Username,
        password,
        passwordNew
      }

      if (passwordNew === passwordNewConfirm) {
        await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/ChangePassword`, dataChange)
          .then(async function (response) {
            console.log(response)

            if (response.data.Result === "Success") {
              notify('success', 'Success', `Change Password Success`)
            } else {
              notify('danger', 'ERROR', 'Data Error')
            }

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
        notify('danger', 'ERROR', 'New Password and Retype New Password not Match')
      }


    }
  }

  return (
    <AvForm onSubmit={e => e.preventDefault()} onSubmit={handleSubmit}>
      <Row>
        <Col sm='6'>
          <FormGroup>
            <InputPasswordToggle
              tag={AvInput}
              className='input-group-merge'
              label='Old Password'
              htmlFor='old-password'
              name='old-password'
              required
              value={password}
              // onChange={handlePasswordChange}
              onChange={e => setPassword(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm='6'>
          <FormGroup>
            <InputPasswordToggle
              tag={AvInput}
              className='input-group-merge'
              label='New Password'
              htmlFor='new-password'
              name='new-password'
              required
              value={passwordNew}
              // onChange={handlePasswordNewChange}
              onChange={e => setPasswordNew(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col sm='6'>
          <FormGroup>
            <InputPasswordToggle
              tag={AvInput}
              className='input-group-merge'
              label='Retype New Password'
              htmlFor='retype-new-password'
              name='retype-new-password'
              required
              value={passwordNewConfirm}
              // onChange={handlePasswordNewConfirmChange}
              onChange={e => setPasswordNewConfirm(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col className='mt-1' sm='12'>
          <Button.Ripple className='mr-1' color='primary'>
            Save changes
          </Button.Ripple>
          <Button.Ripple color='secondary' outline>
            Cancel
          </Button.Ripple>
        </Col>
      </Row>
    </AvForm>
  )
}

export default PasswordTabContent
