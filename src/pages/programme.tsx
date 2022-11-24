import { graphql, HeadProps, PageProps } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../components/layout'
import { SEO } from '../components/seo'
import * as styles from "../styles/program.module.css"

const Programme = ({ data }: PageProps<Queries.ProgrammePageQuery>) => {
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
      <Container fluid className={styles.container}>
        {/* <Row className={styles.grid_row}>
          <Col xs={10}>
          <div className={styles.main_wrapper}>
          {data.allStrapiArtist.nodes.map(artist => (
            <div className={styles.artist_wrapper}>
              <div className={styles.artist_img_wrapper}>
                <GatsbyImage alt={artist.Name!} image={artist.Image!.localFile!.childImageSharp!.gatsbyImageData!} className={styles.artist_image}/>
                <h4 className={styles.artist_name}>
                    {artist.Name!}
                </h4>
              </div>
            </div>
          ))}
        </div>
          </Col>
        </Row> */}
        <Row className={styles.grid_row} xs={3}>
          {data.allStrapiArtist.nodes.map(artist => (
            <Col className={styles.artist_wrapper}>
              <div className={styles.artist_img_wrapper}>
                <GatsbyImage alt={artist.Name!} image={artist.Image!.localFile!.childImageSharp!.gatsbyImageData!} className={styles.artist_image}/>
                <h4 className={styles.artist_name}>
                    {artist.Name!}
                </h4>
              </div>
            </Col>
            ))}
        </Row>
        
      </Container>
    </Layout>
  )
}

export default Programme

export const Head = ({ data }: HeadProps<Queries.ProgrammePageQuery>) => <SEO title={JSON.parse(data.seo!.data!).seo}/>

export const query = graphql`
query ProgrammePage($language: String!) {
  locales: allLocale(filter: {language: {eq: $language}}) {
    edges {
      node {
        ns
        data
        language
      }
    }
  }
  seo: locale(language: {eq: $language}, ns: {eq: "programme"}) {
    data
  }
  allStrapiArtist(filter: {locale: {eq: $language}}, sort: {Name: ASC}) {
    nodes {
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
  wip:file(name: {eq: "vbf_underconstruction"}, sourceInstanceName: {eq: $language}) {
    publicURL
  }
}
`;