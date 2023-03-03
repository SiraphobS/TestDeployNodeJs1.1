import { Fragment, useState, useContext } from 'react'
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
import { Row, Col, CardTitle, CardText, FormGroup, Label, Button } from 'reactstrap'
import axios from 'axios'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'

import '@styles/base/pages/page-auth.scss'

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

const home = () => {
  const ability = useContext(AbilityContext)

  const [skin, setSkin] = useSkin()

  const history = useHistory()

  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [tel, setTel] = useState('')
  const [terms, setTerms] = useState(false)
  const [corporation, setCorporation] = useState(false)
  const [corporationNumber, setCorporationNumber] = useState('')
  const [rexPassword, setRexPassword] = useState('')


  const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

    return (
        <div>
            
        <h2>HELLO</h2>
        <p>Cras facilisis urna ornare ex volutpat, et
        convallis erat elementum. Ut aliquam, ipsum vitae
        gravida suscipit, metus dui bibendum est, eget rhoncus nibh
        metus nec massa. Maecenas hendrerit laoreet augue
        nec molestie. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.</p>

        <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
        </div>
    )
}

export default home
