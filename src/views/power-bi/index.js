import {Fragment} from 'react'
import { Row, Col, CardTitle, CardText, FormGroup, Label, Button, Card, Container, Table} from 'reactstrap'
import Avatar from '@components/avatar'
import '@styles/base/pages/page-auth.scss'

const PowerBi = () => {
  return (
    <div>
      <Card className='w-100 py-2 text-center'>
      <Container>
      <iframe width="1024" height="612" src="https://app.powerbi.com/view?r=eyJrIjoiMWUyNWM1NzUtNTVlMi00NTZhLWFkMGYtZGZhZjUwMTgwNGY4IiwidCI6Ijc3YTI5YzBiLWVmMDEtNDFkYS1hZDU1LTJiMjBmZWI0NzE0ZSIsImMiOjEwfQ%3D%3D&pageName=ReportSectionce9bcd421bc67889a512" frameborder="0" allowFullScreen="true"></iframe>
      </Container>
      </Card>
    </div>
  )
}

export default PowerBi
