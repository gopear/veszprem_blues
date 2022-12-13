import { graphql, HeadProps, PageProps } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { Link, Trans } from 'gatsby-plugin-react-i18next'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../components/layout'
import { SEO } from '../components/seo'
import * as styles from "../styles/program.module.css"

type Days = "csutortok" | "pentek" | "szombat" | "vasarnap"

const Programme = ({ data }: PageProps<Queries.ProgrammePageQuery>) => {

  const days  = ["csütörtök", "péntek", "szombat", "vasárnap"]
  const daysNorm : Days[] = ["csutortok", "pentek", "szombat", "vasarnap"]
  const dates = ["2023-04-13", "2023-04-14", "2023-04-15", "2023-04-16"]
  const stages = ["Ray Charles Ballroom", "Ma Rayney`s Black Bottom", "Boom Boom Room", "Hangvilla konferencia terem", "Papírkutya"]

  return (
    <Layout>
      <Container fluid>
        {/* {dates.map(d => {
          const artists = data.allStrapiArtist.nodes.flatMap(a => {
            return {name: a.Name, performance: a.Performance?.filter(p => p?.PerformanceDate === d)}
          })

          return (
            <Row as="section">
              <h2>{days[dates.indexOf(d)]}</h2>
              <h3>{d}</h3>
              <table>
                <thead>
                  <tr>
                    <th/>
                    {stages.map(s => <th>{s}</th>)}
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
            </Row>
          )
        })} */}
        {daysNorm.map((d,idx) => (
          <Row key={idx} className={styles.table_row}>
            <Col xs={12} md={10}>
              <h2><Trans>{days[idx]}</Trans></h2>
              <h4>{dates[idx]}</h4>
              <img src={data[d]?.publicURL!} alt={d}/>
            </Col>
          </Row>
        ))}
        
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
  # allStrapiArtist {
  #   nodes {
  #     Name
  #     Slug
  #     Performance {
  #       PerformanceDate
  #       PerformanceDuration
  #       PerformanceStart
  #       Stage
  #     }
  #   }
  # }
  csutortok:file(name: {eq: "csutortok_VBF"}) {
    publicURL
  }
  pentek:file(name: {eq: "pentek_VBF"}) {
    publicURL
  }
  szombat:file(name: {eq: "szombat_VBF"}) {
    publicURL
  }
  vasarnap:file(name: {eq: "vasarnap_VBF"}) {
    publicURL
  }
}
`;