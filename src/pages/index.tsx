import * as React from "react"
import { graphql, PageProps, HeadProps } from "gatsby"
import Layout from "../components/layout"
import { SEO } from "../components/seo"
import { Link, Trans } from 'gatsby-plugin-react-i18next';
import { Col, Container, Row, Stack } from "react-bootstrap";
import * as styles from "../styles/index.module.css"

const IndexPage = ({ data } : PageProps<Queries.IndexPageQuery>) => {

  const highlightedSponsors = data.strapiIndex?.Sponsors?.filter(s => s?.Highlight === true);
  const nonHighlightedSponsors = data.strapiIndex?.Sponsors?.filter(s => s?.Highlight === false);

  return (
    <Layout>
      <Container fluid>
        <Row className={styles.wrapper}>
          <Col xs={12} lg={6} className={styles.hero_logo_col}>
            <img src={data.strapiIndex!.Logo!.url!} alt='Hero logo' className={styles.hero_logo}/>
            <div>
              <Stack direction="horizontal" className={`${styles.sponsor_wrapper} ${styles.sponsor_highlight}`}>
                  {highlightedSponsors?.map(s => (
                    <a key={s!.Link!} href={s!.Link!}>
                      <img alt={s!.Link!} src={s!.Logo!.url!}/>
                    </a>
                  ))}
              </Stack>
              <Stack direction="horizontal" className={styles.sponsor_wrapper}>
                  {nonHighlightedSponsors?.map(s => (
                    <a key={s!.Link!} href={s!.Link!}>
                      <img alt={s!.Link!} src={s!.Logo!.url!}/>
                    </a>
                  ))}
              </Stack>
            </div>
          </Col>
          <Col xs={12} md={10} lg={{ span: 6, offset: 5 }} className={styles.hero_content} >
            <img src={data.strapiIndex!.Hero!.url!} alt='Hero' className={styles.hero}/>
            <Link to="/tickets" className={styles.jegyek}><Trans>Jegyek</Trans></Link>
          </Col>
        </Row>
        {/* <Row className={styles.content_wrapper}>
          <Col xs={12} lg={{span: 7, offset: 5}} className={styles.fellepo_wrapper_col}>
            <ul>
              {data.strapiIndex!.Artists!.map(artist => (
                <li key={artist!.Slug!}><Link to={artist!.gatsbyPath!}>{artist!.Name!}</Link></li>
              ))}
            </ul>
          </Col>
        </Row> */}
        <Row className={styles.content_wrapper}>
          <Col xs={12} lg={{span: 7, offset: 5}} className={styles.fellepo_wrapper_col}>
            <h1 className={styles.main_text}>{data.strapiIndex?.Text}</h1>
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
  strapiIndex(locale: {eq: $language}) {
    Hero {
      url
    }
    Logo {
      url
    }
    Sponsors {
      Highlight
      Link
      Logo {
        url
      }
    }
    Artists {
      gatsbyPath(
        filePath: "/artist/{StrapiArtist.Slug}"
      )
      Name
      Slug
    }
    Text
  }
}
`;