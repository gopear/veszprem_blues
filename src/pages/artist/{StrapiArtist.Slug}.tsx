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

function getYoutubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11)
    ? match[2]
    : null;
}

const MediaComponent = ({ id, mediaType, artistName, single = false }: { id: string, mediaType: 'Spotify' | 'YouTube', artistName: string, single? :boolean }) => {
  return (
    <iframe className={`embed-responsive-item ${single ? styles.media_single : styles.media}`} src={mediaType === 'Spotify' ? `https://open.spotify.com/embed/album/${id}` : `https://www.youtube.com/embed/${id}`}
      width="300" height="380"
      title={`${artistName} ${mediaType}`}
      allow="encrypted-media"
      style={mediaType === 'YouTube' ? { borderRadius: 10 } : undefined} />
  )
}

const Artist = ({ data }: PageProps<Queries.ArtistPageQuery>) => {

  let spoti = undefined;
  const youtube = data.strapiArtist?.YouTube ? getYoutubeId(data.strapiArtist.YouTube) : undefined;
  if (data.strapiArtist?.Spotify) {
    try {
      spoti = data.strapiArtist?.Spotify.replace(/\?.*/, '')
      spoti = spoti.replace(/https?:\/\/open\.spotify\.com\/album\//, '')
    } catch (error) { }
  }

  const mediaXOR = !youtube != !spoti

  // if (!data.strapiArtist?.Description?.data) {
  //   console.log(data.strapiArtist?.Name, ' description error')
  // }

  const description = data.strapiArtist?.Description?.data ? data.strapiArtist.Description.data.childMarkdownRemark!.html! : ''


  let performance = undefined;

  if (data.strapiArtist?.Performance) {
    performance = Array.from(data.strapiArtist?.Performance);
    performance = performance.filter(p => p?.PerformanceDate && p?.PerformanceDuration && p?.PerformanceStart && p?.Stage) as Performance[]
    performance.sort((a, b) => a.PerformanceDate.localeCompare(b.PerformanceDate!) || a.PerformanceStart.localeCompare(b.PerformanceStart))
  }

  return (
    <Layout>
      <Container fluid>
        <Row className={styles.img_row_wrapper}>
          <Col xs={11} md={8} className={styles.img_wrapper}>
            <GatsbyImage alt={data.strapiArtist!.Name!} image={data.strapiArtist!.Image!.localFile!.childImageSharp!.gatsbyImageData!} className={styles.img} />
            <div className={styles.name_wrapper}>
              <h1 className={styles.name}>{data.strapiArtist!.Name!}</h1>
            </div>
          </Col>
        </Row>
        <Row className={styles.data_wrapper}>
          <Col xs={12} sm={10} lg={6} xxl={7} className={styles.data_wrapper_col}>
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
            {performance && mediaXOR ?
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
          
          {!mediaXOR && performance ?
            <Col xs={12} sm={10} lg={4} xxl={3}>
              <div className={`${styles.performance_wrapper_wo_media} ${styles.performance_wrapper}`}>
                {performance.map((p, idx) => (
                  <Stack key={idx} className={styles.performance}>
                    <span className={styles.date}>{p.PerformanceDate}</span>
                    <span>{p.PerformanceStart.slice(0, -3)}</span>
                    <span>{p.Stage}</span>
                  </Stack>
                ))
                }
              </div>
            </Col>
            :
            null
          }

          {mediaXOR ?
            <Col xs={12} sm={10} lg={4} xxl={3} className={styles.media_single_col}>
              <MediaComponent artistName={data.strapiArtist!.Name!} mediaType={spoti ? 'Spotify' : 'YouTube'} id={spoti ? spoti : youtube!} single={true}/>
            </Col>
            :
            null
          }

        </Row>

        {spoti && youtube ?
          <Row className={styles.data_wrapper}>
            <Col xs={12} sm={10} lg={6} xxl={7} className={styles.media_col}>
              <MediaComponent artistName={data.strapiArtist!.Name!} mediaType={'YouTube'} id={youtube} />
            </Col>
            <Col xs={12} sm={10} lg={4} xxl={3} className={styles.media_col}>
              <MediaComponent artistName={data.strapiArtist!.Name!} mediaType={'Spotify'} id={spoti} />
            </Col>
          </Row>
          :
          null
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
    YouTube
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