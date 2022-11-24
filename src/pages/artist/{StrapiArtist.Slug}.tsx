import { graphql, HeadProps, PageProps } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../../components/layout'
import { SEO } from '../../components/seo'
import * as styles from "../../styles/artist.module.css"

const Artist = ({ data }: PageProps<Queries.ArtistPageQuery>) => {
  return (
    <Layout>
      <Container fluid>
        <Row className={styles.img_row_wrapper}>
          <Col xs={10} md={8} className={styles.img_wrapper}>
            <GatsbyImage alt={data.strapiArtist!.Name!} image={data.strapiArtist!.Image!.localFile!.childImageSharp!.gatsbyImageData!} className={styles.img}/>
            <div className={styles.name_wrapper}>
              <h1 className={styles.name}>{data.strapiArtist!.Name!}</h1>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Artist

export const Head = ({ data }: HeadProps<Queries.ArtistPageQuery>) => <SEO title={data.strapiArtist!.Name!} />

export const query = graphql`
query ArtistPage($language: String!, $id: String!) {
  locales: allLocale(filter: {language: {eq: $language}}) {
    edges {
      node {
        ns
        data
        language
      }
    }
  }
  strapiArtist(id: {eq: $id}) {
    Description
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
    Name
    Nationality
    Slug
    Spotify
  }
  wip:file(name: {eq: "vbf_underconstruction"}, sourceInstanceName: {eq: $language}) {
    publicURL
  }
}
`;