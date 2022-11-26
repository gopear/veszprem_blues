import React from 'react'
import { Col, Row } from 'react-bootstrap'

const UnderConstruction = ({ url } : {url: string | null}) => {
  return (
    <Row style={{ justifyContent: 'center', paddingTop: '3vh', 'paddingBottom': '3vh', paddingLeft: '5%', paddingRight: '5%' }}>
      <Col xs={12} style={{ backgroundImage: `url(${url})`, height: '80vh', width: '100%', backgroundRepeat: 'no-repeat', backgroundSize: 'fit', backgroundPosition: 'center' }}>
      </Col>
    </Row>
  )
}

export default UnderConstruction