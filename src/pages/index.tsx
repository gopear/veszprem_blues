import * as React from "react"
import { graphql, PageProps, HeadProps } from "gatsby"
import Layout from "../components/layout"
import { SEO } from "../components/seo"
import { Link, Trans } from 'gatsby-plugin-react-i18next';
import { Col, Container, Row, Stack } from "react-bootstrap";
import * as styles from "../styles/index.module.css"

const IndexPage = ({ data } : PageProps<Queries.IndexPageQuery>) => {

  return (
    <Layout>
      <Container fluid>
        <Row className={styles.wrapper}>
          <Col xs={12} lg={6} className={styles.hero_logo_col}>
            <img src={data.strapiIndex!.Logo!.url!} alt='Hero logo' className={styles.hero_logo}/>
            <Stack direction="horizontal" className={styles.sponsor_wrapper}>
                {data.strapiIndex?.Sponsors?.map(s => (
                  <a key={s!.Link!} href={s!.Link!}>
                    <img alt={s!.Link!} src={s!.Logo!.url!}/>
                  </a>
                ))}
            </Stack>
          </Col>
          <Col xs={12} md={10} lg={{ span: 6, offset: 5 }} className={styles.hero_content} >
            <img src={data.strapiIndex!.Hero!.url!} alt='Hero' className={styles.hero}/>
            <Link to="/tickets" className={styles.jegyek}><Trans>Jegyek</Trans></Link>
          </Col>
        </Row>
        <Row className={styles.content_wrapper}>
          <Col xs={12} lg={{span: 7, offset: 5}} className={styles.fellepo_wrapper_col}>
            <ul>
              {data.strapiIndex!.Artists!.map(artist => (
                <li key={artist!.Artist!.Slug!}><Link to={`/artist/${artist!.Artist!.Slug!}`}>{artist!.Artist!.Name!}</Link></li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default IndexPage

export const Head = ({ data } : HeadProps<Queries.IndexPageQuery>) => <SEO title={JSON.parse(data.seo!.data!).seo}/>

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
  seo: locale(language: {eq: $language}, ns: {eq: "index"}) {
    data
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
    Artists {
      Artist {
        Name
        Slug
      }
    }
  }
}
`;