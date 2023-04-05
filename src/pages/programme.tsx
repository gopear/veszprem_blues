import { graphql, HeadProps, PageProps } from 'gatsby'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import Layout from '../components/layout'
import { SEO } from '../components/seo'
import * as styles from '../styles/programme.module.css'
import { GatsbyImage } from 'gatsby-plugin-image'

function getYoutubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11)
    ? match[2]
    : null;
}

const Programme = ({ data }: PageProps<Queries.ProgrammePageQuery>) => {

    const days = ["csütörtök", "péntek", "szombat", "vasárnap"]
    const dates = ["2023-04-13", "2023-04-14", "2023-04-15", "2023-04-16"]
    const workshops = data.allStrapiProgram.nodes;

    return (
        <Layout>
            <Container fluid className={styles.container}>
                {dates.map(d => {
                    const date_workshops = workshops.filter(w => w.Date === d); 
                    return (
                        date_workshops.length > 0 ?
                            <div key={d}>
                                <div className={styles.day}>
                                    <h2><Trans>{days[dates.indexOf(d)]}</Trans></h2>
                                    <h3>{d}</h3>
                                </div>
                                <div>
                                    {date_workshops.map(w => {
                                        return (
                                            <Row key={w.Name} className={styles.workshop_wrapper}>
                                                <Col className={styles.ws_content_wrapper} xl={12} xxl={6}>
                                                  <h4>{w.Name}</h4>
                                                  <div dangerouslySetInnerHTML={{__html: w.Description!.data!.childMarkdownRemark!.html!}} className={styles.ws_content}/>
                                                  {w.TicketLink !== null ?
                                                    <div className={styles.btn_wrapper}>
                                                      <a className={styles.jegyek} href={w.TicketLink!} target="_blank">
                                                          <Trans>MEGVESZEM</Trans>
                                                      </a>
                                                    </div>
                                                    : 
                                                    null}
                                                </Col>
                                                <Col className={styles.media_col} xl={12} xxl={5}>
                                                  {w.YoutubeLink !== null ?
                                                    <iframe className={`embed-responsive-item ${styles.media}`} src={`https://www.youtube.com/embed/${getYoutubeId(w.YoutubeLink!)}`}
                                                            width="300" height="380"
                                                            title={`${w.Name} YouTube video`}
                                                            allow="encrypted-media"
                                                            style={{ borderRadius: 10 }} />
                                                 
                                                    : w.Image !== null ?
                                                      <GatsbyImage image={w.Image!.localFile!.childImageSharp!.gatsbyImageData!} alt={w.Name!} className={styles.image} />
                                                    : null}
                                                </Col>
                                            </Row>
                                        )
                                    })}
                                </div>
                            </div>
                        :
                            null
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
  allStrapiProgram(filter: {locale: {eq: $language}}) {
    nodes {
      Name
      TicketLink
      YoutubeLink
      Image {
        localFile {
          childImageSharp {
            gatsbyImageData (
              aspectRatio: 1.5,
              layout: FULL_WIDTH,
              transformOptions: {
                cropFocus: CENTER,
                fit: COVER
              }
            )
          }
        }
      }
      Description {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      Date
      # Start
    }
  }
}
`;
