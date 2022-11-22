import { graphql, HeadProps, PageProps } from 'gatsby'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../../components/layout'
import { SEO } from '../../components/seo'

const Artist = ({ data }: PageProps<Queries.ArtistPageQuery>) => {
  return (
    <Layout>
      <Container>
        <Row style={{ justifyContent: 'center', paddingTop: '10vh', 'paddingBottom': '3vh', paddingLeft: '5%', paddingRight: '5%' }}>
          <Col xs={12} style={{ backgroundImage: `url(${data.wip!.publicURL!})`, height: '80vh', width: '100%', backgroundRepeat: 'no-repeat', backgroundSize: 'fit', backgroundPosition: 'center' }}>
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
          gatsbyImageData
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