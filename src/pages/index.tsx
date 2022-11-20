import * as React from "react"
import { graphql, HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout"
import { SEO } from "../components/seo"
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { t } from "i18next";
import { Button, Col, Container, Row } from "react-bootstrap";
import * as styles from "../styles/index.module.css"

const IndexPage = ({ location, data } : PageProps<Queries.IndexPageQuery>) => {

  const { t } = useTranslation();

  return (
    <Layout location={location}>
      <Container fluid>
        <Row className={styles.wrapper}>
          <Col xs={5}>
            <img src={data.strapiIndex!.Logo!.url!} alt='Hero logo' className={styles.hero_logo}/>
          </Col>
          <Col xs={6} className={styles.hero_content}>
            <img src={data.strapiIndex!.Hero!.url!} alt='Hero' className={styles.hero}/>
            <button className={styles.jegyek}><Trans>Jegyek</Trans></button>
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
          </Col>
          <Col xs={7}>
          <div className={styles.fellepo_wrapper}>
              asdadadsadsada
          </div>
          </Col>
          
        </Row>
      </Container>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <SEO title={t('seo')}/>

export const query = graphql`
  query IndexPage($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    strapiIndex {
      Hero {
        url
      }
      Logo {
        url
      }
      Sponsors {
        Link
        Logo {
          url
        }
      }
    }
  }
`;