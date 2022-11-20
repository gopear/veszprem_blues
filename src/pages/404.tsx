import * as React from "react"
import { Link, HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout"
import { SEO } from "../components/seo"
import { Row, Col, Container } from "react-bootstrap"

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Container fluid>
        <Row style={{height: '80vh'}}>
          <Col style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <p>
              HAMAROSAN...
            </p>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <SEO title={'Not found'}/>
