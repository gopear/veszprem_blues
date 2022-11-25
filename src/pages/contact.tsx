import { graphql, HeadProps, PageProps } from 'gatsby';
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Layout from '../components/layout';
import { SEO } from '../components/seo';

const Contact = ({ data }: PageProps<Queries.ContactPageQuery>)  => {
  return (
    <Layout>
      <Container>
        <Row style={{ justifyContent: 'center', paddingTop: '10vh', 'paddingBottom': '3vh', paddingLeft: '5%', paddingRight: '5%' }}>
          <Col xs={12} style={{ backgroundImage: `url(${data.wip!.publicURL!})`, height: '80vh', width: '100%', backgroundRepeat: 'no-repeat', backgroundSize: 'fit', backgroundPosition: 'center' }}>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Contact

export const Head = ({ data }: HeadProps<Queries.ContactPageQuery>) => <SEO title={JSON.parse(data.seo!.data!).seo}/>

export const query = graphql`
query ContactPage($language: String!) {
  locales: allLocale(filter: {language: {eq: $language}}) {
    edges {
      node {
        ns
        data
        language
      }
    }
  }
  seo: locale(language: {eq: $language}, ns: {eq: "contact"}) {
    data
  }
  wip:file(name: {eq: "vbf_underconstruction"}, sourceInstanceName: {eq: $language}) {
    publicURL
  }
}
`;