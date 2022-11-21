import { graphql, HeadProps, PageProps } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../components/layout'
import { SEO } from '../components/seo'
import * as styles from "../styles/program.module.css"
import { useEffect } from 'react';
import { navigate } from "@reach/router"
import { useI18next } from 'gatsby-plugin-react-i18next'


const Program = ({ data }: PageProps<Queries.ProgramPageQuery>) => {
  return null;
  return (
    <Layout>
      <Container fluid>
        <div className={styles.main_wrapper}>
          {data.allStrapiArtist.nodes.map(artist => (
            <div className={styles.artist_wrapper}>
              <div className={styles.artist_img_wrapper}>
                <GatsbyImage alt={artist.Name!} image={artist.Image!.localFile!.childImageSharp!.gatsbyImageData!} className={styles.artist_image}/>
                <div className={styles.artist_name}>
                    <h4>
                      {artist.Name!}
                    </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Layout>
  )
}

export default Program

export const Head = ({ data }: HeadProps<Queries.ProgramPageQuery>) => {
  const t = data.locales.edges.filter(n => n.node.ns === 'program')
  return (
    <SEO title={t.length > 0 ? JSON.parse(t[0].node.data!).seo : undefined} />
  )
}



export const query = graphql`
query ProgramPage($language: String!) {
  locales: allLocale(filter: {language: {eq: $language}}) {
    edges {
      node {
        ns
        data
        language
      }
    }
  }
  allStrapiArtist(filter: {locale: {eq: $language}}, sort: {Name: ASC}) {
    nodes {
      Slug
      Name
      Image {
        localFile {
          childImageSharp {
            gatsbyImageData (
              aspectRatio: 0.7,
              layout: FULL_WIDTH
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
`;