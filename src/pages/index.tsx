import * as React from "react"
import { graphql, PageProps, HeadProps } from "gatsby"
import Layout from "../components/layout"
import { SEO } from "../components/seo"
import { Link, Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import * as styles from "../styles/index.module.css"

const IndexPage = ({ location, data } : PageProps<Queries.IndexPageQuery>) => {

  return (
    <Layout location={location}>
      <Container fluid>
        <Row className={styles.wrapper}>
          <Col xs={5} className={styles.hero_logo_col}>
            <img src={data.strapiIndex!.Logo!.url!} alt='Hero logo' className={styles.hero_logo}/>
            <Stack direction="horizontal" className={styles.sponsor_wrapper}>
                {data.strapiIndex?.Sponsors?.map(s => (
                  <a key={s!.Link!} href={s!.Link!}>
                    <img alt={s!.Link!} src={s!.Logo!.url!}/>
                  </a>
                ))}
            </Stack>
          </Col>
          <Col xs={{span: 6, offset: 5}} className={styles.hero_content} >
            <img src={data.strapiIndex!.Hero!.url!} alt='Hero' className={styles.hero}/>
            <button className={styles.jegyek}><Trans>Jegyek</Trans></button>
          </Col>
        </Row>
        <Row>
          <Col xs={5} className={styles.placeholder}>
          </Col>
          <Col xs={7} className={styles.fellepo_wrapper_col}>
            {data.allStrapiArtist.nodes.map(artist => (
              <p>
                {artist.Name!}
              </p>
            ))}
          </Col>
          
        </Row>
      </Container>
    </Layout>
  )
}

export default IndexPage

export const Head = ({ data } : HeadProps<Queries.IndexPageQuery>) => {
  const t = data.locales.edges.filter(n => n.node.ns === 'index')
  return (
    <SEO title={t.length > 0 ? JSON.parse(t[0].node.data!).seo : undefined}/>
  )
}


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
    allStrapiArtist(filter: {locale: {eq: $language}}) {
      nodes {
        Slug
        Name
      }
    }
  }
`;