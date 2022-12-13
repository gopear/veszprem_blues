import { graphql, HeadProps, PageProps } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Col, Container, Row, Stack } from 'react-bootstrap'
import Layout from '../../components/layout'
import { SEO } from '../../components/seo'
import UnderConstruction from '../../components/under_construction'
import * as styles from "../../styles/artist.module.css"

interface Performance {
  PerformanceDate: string;
  PerformanceDuration: string;
  PerformanceStart: string;
  Stage: string;
}

const Artist = ({ data }: PageProps<Queries.ArtistPageQuery>) => {

  let spoti = undefined;
  if (data.strapiArtist?.Spotify) {
    try {
      spoti = new URL(data.strapiArtist?.Spotify)
    } catch (error) {
      console.log(data.strapiArtist.Name, ' link error')
    }
  }

  if (!data.strapiArtist?.Description?.data) {
    console.log(data.strapiArtist?.Name, ' description error')
  }

  const description = data.strapiArtist?.Description?.data ? data.strapiArtist.Description.data.childMarkdownRemark!.html! : ''


  let performance = undefined;

  if (data.strapiArtist?.Performance) {
    performance = Array.from(data.strapiArtist?.Performance);
    performance = performance.filter(p => p?.PerformanceDate && p?.PerformanceDuration && p?.PerformanceStart && p?.Stage) as Performance[]
    performance.sort((a,b) => a.PerformanceDate.localeCompare(b.PerformanceDate!) || a.PerformanceStart.localeCompare(b.PerformanceStart))
  }

  return (
    <Layout>
      <Container fluid>
        { data.strapiArtist ?
        <>
          <Row className={styles.img_row_wrapper}>
            <Col xs={11} md={8} className={styles.img_wrapper}>
              <GatsbyImage alt={data.strapiArtist!.Name!} image={data.strapiArtist!.Image!.localFile!.childImageSharp!.gatsbyImageData!} className={styles.img} />
              <div className={styles.name_wrapper}>
                <h1 className={styles.name}>{data.strapiArtist!.Name!}</h1>
              </div>
            </Col>
          </Row>
          <Row className={styles.data_wrapper}>
            <Col xs={12} sm={10} lg={data.strapiArtist?.Spotify ? 7 : 10}>
              <div className={styles.description} dangerouslySetInnerHTML={{__html: description}}/>
              {performance ? 
                <div className={styles.performance_wrapper}>
                  {performance.map((p, idx) => (
                    <Stack key={idx} className={styles.performance}>
                      <span className={styles.date}>{p.PerformanceDate}</span>
                      <span>{p.PerformanceStart.slice(0, -3)}</span>
                      <span>{p.Stage}</span>
                    </Stack>
                  ))
                  }
                </div>
                :
                null
              }
            </Col>
            { spoti && 
              <Col xs={12} sm={10} lg={3}>
                  <iframe className={`$embed-responsive-item ${styles.spotify}`} src={`https://open.spotify.com/embed/album/${spoti.pathname.split('/')[2]}`}
                          width="300" height="380" 
                          title={`${data.strapiArtist!.Name!} Spotify`}
                          allow="encrypted-media"/>
              </Col>
            }
          </Row>
          { performance ? 
            <Row>
              <Col xs={12} sm={10}>
                
              </Col>
            </Row>
            :
            null
          }
          
        </>
        :
          <UnderConstruction url={data.wip!.publicURL}/>
        }
      </Container>
    </Layout>
  )
}

export default Artist

export const Head = ({ data }: HeadProps<Queries.ArtistPageQuery>) => <SEO title={data.strapiArtist?.Name} />

export const query = graphql`
query ArtistPage($language: String!,  $Slug: String!) {
  locales: allLocale(filter: {language: {eq: $language}}) {
    edges {
      node {
        ns
        data
        language
      }
    }
  }
  strapiArtist(Slug: {eq: $Slug}, locale: {eq: $language}) {
    Description {
      data {
        childMarkdownRemark {
          html
        }
      }
    }
    Image {
      localFile {
        childImageSharp {
          gatsbyImageData (
              aspectRatio: 1.5,
              layout: FULL_WIDTH,
              transformOptions: {
                cropFocus: ATTENTION,
                fit: COVER
              }
            )
        }
      }
    }
    Name
    Nationality
    Slug
    Spotify
    Performance {
        PerformanceDate
        PerformanceDuration
        PerformanceStart
        Stage
    }
  }
  wip:file(name: {eq: "vbf_underconstruction"}, sourceInstanceName: {eq: $language}) {
    publicURL
  }
}
`;