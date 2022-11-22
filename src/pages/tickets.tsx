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
        <Row>
          <Col xs={12} className={styles.wrapper}>
            {data.strapiTicket!.Ticket!.map(ticket => (
              <Ticket key={ticket!.id} title={ticket!.Name!} day={ticket!.Type!} price={ticket!.Price!} inactive={!ticket!.Available!} isPass={ticket!.Type! === 'bérlet'} />
            ))}
          </Col>
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
  strapiTicket {
    Ticket {
      id
      Available
      Name
      Price
      Type
    }
  }
}
`;