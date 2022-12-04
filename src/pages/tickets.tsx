import { graphql, HeadProps, PageProps } from 'gatsby'
import { Trans } from 'gatsby-plugin-react-i18next'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../components/layout'
import { SEO } from '../components/seo'
import * as styles from "../styles/tickets.module.css"

const Jegyek = ({ data }: PageProps<Queries.TicketsPageQuery>) => {

  const formatter = new Intl.NumberFormat('hu-HU');

  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col xs={12} className={styles.wrapper}>
            {data.strapiTicket!.Ticket!.map(ticket => (
              <div key={ticket!.id} className={styles.ticket_wrapper}>
                <div className={`${styles.ticket_base} ${ticket!.Type! === 'bérlet' ? styles.ticket_pass : ''} ${!ticket!.Available! ? styles.ticket_inactive : ''}`}>
                  <span className={styles.ticket_title}>
                      <h3><Trans>{ticket!.Name!}</Trans></h3>
                      <h4><Trans>{ticket!.Type!}</Trans></h4>
                  </span>
                  <h4 className={styles.ticket_price}>{formatter.format(ticket!.Price!)} HUF</h4>
                  <a className={styles.ticket_btn} href='https://cooltix.hu/event/637b299999c9e71b0efafb4e' style={{pointerEvents: !ticket!.Available! ? 'none' : 'inherit'}}>
                    <Trans>MEGVESZEM</Trans>
                  </a>
                </div>
              </div>
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