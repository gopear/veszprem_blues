import { graphql, HeadProps, PageProps } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react'
import { Col, Container, Row, Stack } from 'react-bootstrap';
import Layout from '../components/layout';
import { SEO } from '../components/seo';
import * as styles from '../styles/summary.module.css'
const Summary = ({ data }: PageProps<Queries.SummaryPageQuery>)  => {

  return (
    <Layout main_style={{display: 'flex'}}>
      <Container fluid className={styles.container}>
        <h2><Trans>Összegzés</Trans></h2>
        <Row className={styles.row}>
          <Col xs={12} md={10}>
            <div dangerouslySetInnerHTML={{__html: data.strapiSummary!.Text!.data!.childMarkdownRemark!.html!}} className={styles.content}/>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Summary

export const Head = ({ data }: HeadProps<Queries.SummaryPageQuery>) => <SEO title={JSON.parse(data.seo!.data!).seo}/>

export const query = graphql`
query SummaryPage($language: String!) {
  locales: allLocale(filter: {language: {eq: $language}}) {
    edges {
      node {
        ns
        data
        language
      }
    }
  }
  seo: locale(language: {eq: $language}, ns: {eq: "summary"}) {
    data
  }
  strapiSummary {
    Text {
      data {
        childMarkdownRemark {
          html
        }
      }
    }
  }
}
`;