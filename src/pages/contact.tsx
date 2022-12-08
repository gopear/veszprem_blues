import { graphql, HeadProps, PageProps } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react'
import { Col, Container, Row, Stack } from 'react-bootstrap';
import Layout from '../components/layout';
import { SEO } from '../components/seo';
import * as styles from '../styles/contact.module.css'
const Contact = ({ data }: PageProps<Queries.ContactPageQuery>)  => {

  const contact = [
    {email: 'aniko.magocsi@gmail.com', text: 'Sajtókapcsolatok / PR'}, 
    {email: 'ticket@veszpremblues.hu', text: 'Jegyvásárással kapcsolatos kérdések'},
    {email: 'info@veszpremblues.hu', text: 'Általános megkeresések'}, 
    {email: 'placement@veszpremblues.hu', text: 'Szponzoráció / megjelenés'}, 
  ]

  return (
    <Layout bg_color='white' main_style={{display: 'flex'}}>
      <Container fluid className={styles.container}>
        <Row className={styles.row}>
          <Col xs={12} md={10}>
            <Stack className={styles.main_wrapper}>
              {contact.map(c => (
                <span key={c.email} className={styles.contact_el}>
                    <h4 className={styles.text}><Trans>{c.text}</Trans></h4>
                    <a href={`mailto:${c.email}`} className={styles.email}><h5>{c.email}</h5></a>
                </span>
            ))}
            </Stack>
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