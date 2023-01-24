import { graphql, HeadProps, PageProps } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { Link, Trans, useI18next } from 'gatsby-plugin-react-i18next'
import { DateTime, Duration, Interval } from 'luxon'
import React from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import Layout from '../components/layout'
import { SEO } from '../components/seo'
import * as styles from "../styles/program.module.css"

type Days = "csutortok" | "pentek" | "szombat" | "vasarnap"

interface Artist {
  name: string;
  slug: string;
  start: DateTime;
  end: DateTime;
  duration: Duration;
  date: string;
  stage: string;
  nationality: string;
  link: string;
}

type Content = JSX.Element | null;

const Programme = ({ data }: PageProps<Queries.ProgrammePageQuery>) => {

  const days = ["csütörtök", "péntek", "szombat", "vasárnap"]
  const daysNorm: Days[] = ["csutortok", "pentek", "szombat", "vasarnap"]
  const dates = ["2023-04-13", "2023-04-14", "2023-04-15", "2023-04-16"]
  const stagesInBackend = ["Ray Charles Ballroom", "Ma Rayney’s Black Bottom", "Boom Boom Room"]//, "Hangvilla konferencia terem", "Papírkutya"]
  const stagesToDisplay = ["Ray Charles Ballroom (Hangvilla)", "Ma Rainey's Black Bottom (Expresszó)", "Boom Boom Room (étterem)"]//, "Hangvilla konferencia terem", "Papírkutya"]
  


  const { navigate } = useI18next()

  const artists = data.allStrapiArtist.nodes.flatMap(a => a.Performance?.filter(p => p && p?.PerformanceDate && p?.PerformanceDuration && p?.PerformanceStart && p?.Stage)
    .flatMap(p => {
      const startDuration = Duration.fromISOTime(p!.PerformanceStart!)
      const startDate = DateTime.fromISO(`${p!.PerformanceDate!}T${p!.PerformanceStart!}`, { locale: 'hu' })
      return {
        name: a.Name,
        slug: a.Slug,
        start: startDuration.hours > 10 ? startDate : startDate.plus({ days: 1 }),
        duration: Duration.fromISOTime(p!.PerformanceDuration!),
        date: p!.PerformanceDate!,
        stage: p!.Stage!,
        nationality: a.Nationality,
        link: a.gatsbyPath
      }
    })) as Artist[]

  return (
    <Layout>
      <Container fluid>
        {dates.map(d => {

          const startTimes = artists.filter(a => a.date === d).map(a => ({ start: a.start, duration: a.duration }))
          const min = DateTime.min(...startTimes.map(s => s.start)).minus({ minutes: 15 })
          const max = DateTime.max(...startTimes.map(s => s.start.plus(s.duration))).plus({ minutes: 15 })
          const interval = Interval.fromDateTimes(min, max).splitBy(Duration.fromDurationLike({ minutes: 15 })).map(i => i.start)


          const content: Content[][] = interval.map(i => (
            stagesInBackend.map(s => {
              const artist = artists.find(a => a.date === d && a.stage === s && a.start.equals(i))
              return artist ?
                  <td rowSpan={artist.duration.toMillis() / 900000} className={styles.artist_cell} onClick={() => navigate(artist.link)} >
                    <div className={styles.artist_name}>{artist.name}</div>
                    <div className={styles.nationality}>({artist.nationality})</div>
                  </td> 
                : 
                <td className={styles.empty_cell}/>
            })
          ))
          for (let i = 0; i < content.length; i++) {
            for (let j = 0; j < content[i].length; j++) {
              if (content[i][j] !== null) {
                const rowSpan = content[i][j]!.props['rowSpan']
                if (rowSpan > 0) {
                  for (let k = 1; k < rowSpan; k++) {
                    content[i + k][j] = null
                  }
                }
              }
            }
          }
          return (
            <Row key={d} className={styles.table_wrapper_row}>
              <Col xs={11} xl={10} className={styles.table_wrapper_col}>

                <h2><Trans>{days[dates.indexOf(d)]}</Trans></h2>
                <h3>{d}</h3>
                <Table className={styles.table} responsive='md'>
                  <colgroup>
                    <col style={{width: '10%'}}/>
                    <col style={{width: `${(100-10)/3}%`}}/>
                    <col style={{width: `${(100-10)/3}%`}}/>
                    <col style={{width: `${(100-10)/3}%`}}/>
                    {/* <col style={{width: '10%'}}/> */}
                  </colgroup>
                  <thead>
                    <tr>
                      <th className={styles.header_cell} />
                      {stagesToDisplay.map(s => <th key={s} className={styles.header_cell}>{s}</th>)}
                      {/* <th style={{border: 0}}/> */}
                    </tr>
                  </thead>
                  <tbody>
                    {content.map((c, c_idx) => {
                      return (
                        <tr key={c_idx}>
                          <td className={styles.time_cell}>{interval[c_idx].toLocaleString(DateTime.TIME_24_SIMPLE)}</td>
                          {c}
                          {/* <td className={styles.time_cell}>{interval[c_idx].toLocaleString(DateTime.TIME_24_SIMPLE)}</td> */}
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          )
        })}

      </Container>
    </Layout>
  )
}

export default Programme

export const Head = ({ data }: HeadProps<Queries.ProgrammePageQuery>) => <SEO title={JSON.parse(data.seo!.data!).seo} />

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
  allStrapiArtist(filter: {locale: {eq: $language}}) {
    nodes {
      Name
      Slug
      Nationality
      Performance {
        PerformanceDate
        PerformanceDuration
        PerformanceStart
        Stage
      }
      gatsbyPath(
        filePath: "/artist/{StrapiArtist.Slug}"
      )
    }
  }
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