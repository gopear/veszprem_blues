import * as React from "react"
import { Link, HeadFC, PageProps, graphql } from "gatsby"
import Layout from "../components/layout"
import { SEO } from "../components/seo"
import { Row, Col, Container } from "react-bootstrap"
import { Trans } from "gatsby-plugin-react-i18next"

const NotFoundPage = ({ data } : PageProps<Queries.NotFoundPageQuery>) => {
  return (
    <Layout>
      <Container fluid>
        <Row style={{height: '80vh'}}>
          <Col style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <p>
              <Trans>HAMAROSAN...</Trans>
            </p>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <SEO title={'Not found'}/>

export const query = graphql`
query NotFoundPage($language: String!) {
  locales: allLocale(filter: {language: {eq: $language}}) {
    edges {
      node {
        ns
        data
        language
      }
    }
  }
}
`;