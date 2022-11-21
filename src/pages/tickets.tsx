import { graphql, HeadProps, PageProps } from 'gatsby'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../components/layout'
import { SEO } from '../components/seo'
import Ticket from '../components/ticket'
import * as styles from "../styles/tickets.module.css"

const Jegyek = ({ data }: PageProps<Queries.TicketsPageQuery>) => {
  return (
    <Layout>
      <Container fluid>
        <Row className={styles.wrapper_row}>
          <Ticket title='EARLY BIRD' day='bérlet' price='25 000' isPass={true} />
          <Ticket title='ELŐVÉTELES' day='bérlet' price='35 000' isPass={true} inactive={true} />
          <Ticket title='TELJES ÁRÚ' day='bérlet' price='40 000' isPass={true} inactive={true} />
        </Row>
        <Row className={styles.wrapper_row}>
          <Ticket title='EARLY BIRD' day='csütörtök'  price='8 500' />
          <Ticket title='EARLY BIRD' day='péntek'     price='8 500' />
          <Ticket title='EARLY BIRD' day='szombat'    price='8 500'  />
          <Ticket title='EARLY BIRD' day='vasárnap'   price='8 500' />
        </Row>
         
      </Container>
    </Layout>
  )
}

export default Jegyek

export const Head = ({ data } : HeadProps<Queries.TicketsPageQuery>) => {
  const t = data.locales.edges.filter(n => n.node.ns === 'tickets')
  return (
    <SEO title={t.length > 0 ? JSON.parse(t[0].node.data!).seo : undefined}/>
  )
}

export const query = graphql`
query TicketsPage($language: String!) {
  locales: allLocale(filter: {language: {eq: $language}}) {
    edges {
      node {
        ns
        data
        language
      }
    }
  }
}
`;