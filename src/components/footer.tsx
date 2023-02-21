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
        ASZF {
          url
        }
        Hazirend {
          url
        }
      }
      strapiFooter {
        Sponsors {
          Logo {
            url
          }
          Link
          Name
        }
      }
    }
  `) 

  return (
    <Container as="footer" fluid className={styles.footer_wrapper}>
      {data.strapiFooter?.Sponsors && data.strapiFooter.Sponsors.length > 0 ?
        <Row className={styles.footer_row} style={{marginBottom: 20}}>
          <Col xs={"auto"}>
            <Stack direction='horizontal' gap={4}>
              {data.strapiFooter.Sponsors.map(s => 
                <a href={s?.Link!}><img alt={s?.Name!} src={s?.Logo?.url!} className={styles.footer_sponsor}></img></a>
              )}
            </Stack>
          </Col>
        </Row>
        :
        null
      }
        <Row className={styles.footer_row} style={{marginBottom: 20}}>
          <Col xs={'auto'}>
            <Stack direction='horizontal' gap={4}>
              <a href='https://www.facebook.com/veszprembluesfesztival' className={styles.footer_icon_wrapper}><img alt='Facebook' src={data.strapiCommon!.FacebookIcon!.url!} className={styles.footer_icon}/></a>
              <a href='https://www.instagram.com/veszprembluesfesztival' className={styles.footer_icon_wrapper}><img alt='Instagram' src={data.strapiCommon!.InstagramIcon!.url!} className={styles.footer_icon}/></a>
              {/* <a href='#' className={styles.footer_icon_wrapper}><img alt='Youtube' src={data.strapiCommon!.YoutubeIcon!.url!} className={styles.footer_icon}/></a> */}
            </Stack>
          </Col>
        </Row>
        <Row className={styles.footer_row}>
          <Col xs={12} lg={2} className={styles.footer_links}>
            {/* <Link to='/policy'><Trans>Házirend</Trans></Link> */}
            <a href={data.strapiCommon!.Hazirend!.url!} download><Trans>Házirend</Trans></a>
          </Col>
          <Col xs={12} lg={2} className={styles.footer_links}>
            {/* <Link to='/terms'><Trans>ÁSZF</Trans></Link> */}
            <a href={data.strapiCommon!.ASZF!.url!} download><Trans>ÁSZF</Trans></a>
          </Col>
          <Col xs={12} lg={2} className={styles.footer_links}>
            <Link to='/contact'><Trans>Impresszum</Trans></Link>
          </Col>
        </Row>
    </Container>
  )
}

export default Footer