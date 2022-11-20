import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Navbar, Container, Nav, Stack, DropdownButton, Dropdown } from "react-bootstrap"
import { WindowLocation } from "@reach/router"
import { Link, Trans, useI18next } from 'gatsby-plugin-react-i18next'
import * as styles from "../styles/layout.module.css";

const Navigation = ({ location }: { location: WindowLocation }) => {

  const { languages, originalPath, language } = useI18next();

  const data = useStaticQuery<Queries.HeaderCompQuery>(graphql`
    query HeaderComp {
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
        Logo {
          url
        }
      }
    }
  `)

  return (
    <Navbar fixed={'top'} expand='xl' className={styles.navbar_wrapper}>
      <Container fluid>
        <Navbar.Brand>
          <Link to='/'>
            <img src={data.strapiCommon!.Logo!.url!} alt='Veszprém Blues Fesztivál logo' className={styles.navbar_logo} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
        <Navbar.Collapse id='responsive-navbar-nav' >
          <Nav className={styles.navbar_menu_wrapper}>
            <Nav.Item>
              <Link to='/program'><Trans>Program</Trans></Link>
            </Nav.Item>
            <Nav.Item>
              <Link to='/tickets'><Trans>Jegyek</Trans></Link>
            </Nav.Item>
            <Nav.Item>
              <Link to='/location'><Trans>Helyszín</Trans></Link>
            </Nav.Item>
            <Nav.Item>
              <Link to='/news'><Trans>Hírek</Trans></Link>
            </Nav.Item>
            <Nav.Item>
              <Link to='/contact'><Trans>Kapcsolat</Trans></Link>
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Item>
              <Stack direction='horizontal' gap={3}>
                <a href='#' className={styles.navbar_icon_wrapper}><img alt='Facebook' src={data.strapiCommon!.FacebookIcon!.url!} className={styles.navbar_icon}/></a>
                <a href='#' className={styles.navbar_icon_wrapper}><img alt='Instagram' src={data.strapiCommon!.InstagramIcon!.url!} className={styles.navbar_icon}/></a>
                <a href='#' className={styles.navbar_icon_wrapper}><img alt='Youtube' src={data.strapiCommon!.YoutubeIcon!.url!} className={styles.navbar_icon}/></a>
                <DropdownButton title={language.toUpperCase()} variant={'light'} menuVariant={'dark'}>
                  {languages.map((lng) => (
                    <Dropdown.Item as={Link} to={originalPath} language={lng} className={styles.navbar_lang_switch_item}>
                        {lng.toUpperCase()}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Stack>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation