import { graphql, HeadProps, PageProps } from 'gatsby'
import React from 'react'
import { Container } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import Layout from '../components/layout'
import { SEO } from '../components/seo'
import * as styles from '../styles/workshops.module.css'

const Workshops = ({ data }: PageProps<Queries.WorkshopsPageQuery>) => {

    const days = ["csütörtök", "péntek", "szombat", "vasárnap"]
    const dates = ["2023-04-13", "2023-04-14", "2023-04-15", "2023-04-16"]
    const workshops = data.allStrapiProgram.nodes;

    return (
        <Layout>
            <Container fluid>
                {dates.map(d => {
                    const date_workshops = workshops.filter(w => w.Date === d); 
                    return (
                        date_workshops.length > 0 ?
                            <div key={d}>
                                <div>
                                    <h2><Trans>{days[dates.indexOf(d)]}</Trans></h2>
                                    <h3>{d}</h3>    
                                </div>
                                <div>
                                    {date_workshops.map(w => {
                                        return (
                                            <div key={w.Name} className={styles.workshop_wrapper}>
                                                <h4>{w.Name}</h4>
                                                <div dangerouslySetInnerHTML={{__html: w.Description!.data!.childMarkdownRemark!.html!}}></div>
                                                <a href={w.Link!}>Jegy</a>
                                            </div>
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

export default Workshops

export const Head = ({ data }: HeadProps<Queries.ProgrammePageQuery>) => <SEO title={JSON.parse(data.seo!.data!).seo} />

export const query = graphql`
query WorkshopsPage($language: String!) {
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
  allStrapiProgram {
    nodes {
      Name
      Link
      Description {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      Date
    }
  }
}
`;