import { graphql, Link, useStaticQuery } from 'gatsby'
import { Trans } from 'gatsby-plugin-react-i18next'
import React from 'react'
import { Row, Col, Container, Stack } from "react-bootstrap"
import * as styles from "../styles/layout.module.css"

const Footer = () => {

  const data = useStaticQuery<Queries.FooterCompQuery>(graphql`
    query FooterComp {
      strapiCommon {
        YoutubeIcon {
          url
        }
        FacebookIcon {
          url
        }
        InstagramIcon {
          url
        }
      }
    }
  `)

  return (
    <Container as="footer" fluid className={styles.footer_wrapper}>
        <Row className={styles.footer_row} style={{marginBottom: 20}}>
          <Col xs={'auto'}>
            <Stack direction='horizontal' gap={4}>
              <a href='#' className={styles.footer_icon_wrapper}><img alt='Facebook' src={data.strapiCommon!.FacebookIcon!.url!} className={styles.footer_icon}/></a>
              <a href='#' className={styles.footer_icon_wrapper}><img alt='Instagram' src={data.strapiCommon!.InstagramIcon!.url!} className={styles.footer_icon}/></a>
              <a href='#' className={styles.footer_icon_wrapper}><img alt='Youtube' src={data.strapiCommon!.YoutubeIcon!.url!} className={styles.footer_icon}/></a>
            </Stack>
          </Col>
        </Row>
        <Row className={styles.footer_row}>
          <Col xs={'auto'}>
            <Stack direction='horizontal' gap={5} className={styles.footer_links}>
              <Link to='/terms'><Trans>ÁSZF</Trans></Link>
              <Link to='/policy'><Trans>Házirend</Trans></Link>
              <Link to='/privacy'><Trans>Adatkezelési nyilatkozat</Trans></Link>
              <Link to='/press'><Trans>Sajtó</Trans></Link>
              <Link to='/sponsors'><Trans>Szponzorok</Trans></Link>
            </Stack>
          </Col>
        </Row>
    </Container>
  )
}

export default Footer