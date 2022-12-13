import { graphql, HeadProps, PageProps } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby-plugin-react-i18next'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../components/layout'
import { SEO } from '../components/seo'
import * as styles from "../styles/program.module.css"

const Artists = ({ data }: PageProps<Queries.ArtistsPageQuery>) => {
  // return (
  //   <Layout>
  //     <Container>
  //       <Row style={{justifyContent: 'center', paddingTop: '10vh', 'paddingBottom': '3vh', paddingLeft: '5%', paddingRight: '5%'}}>
  //         <Col xs={12} style={{backgroundImage: `url(${data.wip!.publicURL!})`, height: '80vh', width: '100%', backgroundRepeat: 'no-repeat', backgroundSize: 'fit', backgroundPosition: 'center'}}>
  //         </Col>
  //       </Row>
  //     </Container>
  //   </Layout>
  // )
  return (
    <Layout>
      <Container fluid>
        <Row className={styles.grid_row}>
          <Col xs={10}>
            <div className={styles.main_wrapper}>
              {data.strapiProgramme!.Artists!.map((artist) => (
                artist?.Artist &&
                  <Link key={artist!.Artist.Slug!} to={artist!.Artist!.gatsbyPath!} className={styles.artist_wrapper}>
                    <div className={styles.artist_img_wrapper}>
                      <GatsbyImage alt={artist!.Artist.Name!} image={artist!.Artist.Image!.localFile!.childImageSharp!.gatsbyImageData!} className={styles.artist_image}/>
                      <div className={styles.artist_name_wrapper}> 
                        <h4 className={styles.artist_name}>
                          {artist!.Artist.Name!}
                        </h4>
                      </div>
                    
                    </div>
                  </Link>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Artists

export const Head = ({ data }: HeadProps<Queries.ArtistsPageQuery>) => <SEO title={JSON.parse(data.seo!.data!).seo}/>

export const query = graphql`
query ArtistsPage($language: String!) {
  locales: allLocale(filter: {language: {eq: $language}}) {
    edges {
      node {
        ns
        data
        language
      }
    }
  }
  seo: locale(language: {eq: $language}, ns: {eq: "artists"}) {
    data
  }
  strapiProgramme {
    Artists {
      Artist {
        gatsbyPath(
          filePath: "/artist/{StrapiArtist.Slug}"
        )
        Slug
        Name
        Image {
          localFile {
            childImageSharp {
              gatsbyImageData (
                aspectRatio: 1,
                layout: FULL_WIDTH,
                transformOptions: {
                  cropFocus: ENTROPY,
                  fit: COVER
                }
              )
            }
          }
        }
      }
    }
  }
}
`;