import { Card, CardImg, Row, Col } from 'reactstrap'

import '@styles/base/pages/page-auth.scss'

const home = () => {
  const imgCompany = require(`@src/assets/images/pages/header-home.jpeg`).default
  return (
    <div id='home-page'>
      <Card>
        <CardImg src={imgCompany} alt='Home image' top />
      </Card>
    </div>
    )
}

export default home
