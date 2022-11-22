import * as React from "react"
import { graphql, PageProps, HeadProps } from "gatsby"
import Layout from "../components/layout"
import { SEO } from "../components/seo"
import { Link, Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import * as styles from "../styles/index.module.css"
import { BsDiamondFill } from 'react-icons/bs'
import { useEffect } from "react";

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
            <button className={styles.jegyek}><Trans>Jegyek</Trans></button>
          </Col>
        </Row>
        <Row className={styles.content_wrapper}>
          <Col xs={12} lg={{span: 7, offset: 5}} className={styles.fellepo_wrapper_col}>
            {/* <ul className="list-inline">
              {data.allStrapiArtist.nodes.filter(a => a.Nationality !== 'HU').map(artist => (
                <li className={`list-inline-item ${styles.eng_artist}`}><Link to={artist.Slug!}>{artist.Name!}</Link></li>
              ))}
              {data.allStrapiArtist.nodes.filter(a => a.Nationality === 'HU').map(artist => (
                <li className={`list-inline-item ${styles.hun_artist}`}><Link to={artist.Slug!}>{artist.Name!}</Link></li>
              ))}
            </ul> */}
            <Stack direction="horizontal" gap={4} className={`${styles.fellepo_stack} ${styles.eng_artist}`}>
              <Link to={data.allStrapiArtist.nodes[0].Slug!}>{data.allStrapiArtist.nodes[0].Name!}</Link>
              <BsDiamondFill color="#CFE4FF"/>
              <Link to={data.allStrapiArtist.nodes[1].Slug!}>{data.allStrapiArtist.nodes[1].Name!}</Link>
            </Stack>
            <Stack direction="horizontal" gap={4} className={`${styles.fellepo_stack} ${styles.eng_artist}`}>
              <Link to={data.allStrapiArtist.nodes[2].Slug!}>{data.allStrapiArtist.nodes[2].Name!}</Link>
              <BsDiamondFill color="#CFE4FF"/>
              <Link to={data.allStrapiArtist.nodes[3].Slug!}>{data.allStrapiArtist.nodes[3].Name!}</Link>
            </Stack>
            <Stack direction="horizontal" gap={4} className={`${styles.fellepo_stack} ${styles.eng_artist}`}>
              <Link to={data.allStrapiArtist.nodes[4].Slug!}>{data.allStrapiArtist.nodes[4].Name!}</Link>
              <BsDiamondFill color="#CFE4FF"/>
              <Link to={data.allStrapiArtist.nodes[5].Slug!}>{data.allStrapiArtist.nodes[5].Name!}</Link>
            </Stack>
            <svg className={styles.sep} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 573.84 12.93"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon id="LINE" points="14.2 12.42 0 0 562.62 0.26 573.84 12.93 14.2 12.42" style={{fill: "#fff"}} /></g></g></svg>
            <Link to={data.allStrapiArtist.nodes[6].Slug!} className={styles.hun_artist}>{data.allStrapiArtist.nodes[6].Name!}</Link>
            <Stack direction="horizontal" gap={4} className={`${styles.fellepo_stack} ${styles.hun_artist}`}>
              <Link to={data.allStrapiArtist.nodes[7].Slug!} className={styles.hun_artist}>{data.allStrapiArtist.nodes[7].Name!}</Link>
              <BsDiamondFill color="#CFE4FF"/>
              <Link to={data.allStrapiArtist.nodes[8].Slug!}>{data.allStrapiArtist.nodes[8].Name!}</Link>
            </Stack>
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
    allStrapiArtist(
      filter: {locale: {eq: $language}, OrderOnFrontPage: {gt: 0}}
      sort: {OrderOnFrontPage: ASC}
    ) {
      nodes {
        Slug
        Name
        Nationality
      }
    }
  }
`;