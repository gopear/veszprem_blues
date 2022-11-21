import { graphql, useStaticQuery } from 'gatsby'
import React, { useState } from 'react'
import { Navbar, Container, Nav, Stack, DropdownButton, Dropdown } from "react-bootstrap"
import { WindowLocation } from "@reach/router"
import { Link, Trans, useI18next } from 'gatsby-plugin-react-i18next'
import * as styles from "../styles/layout.module.css";

const Navigation = () => {

  const [collapsed, setCollapsed] = useState(true)
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
    <Navbar fixed={'top'} expand='xxl' className={styles.navbar_wrapper}>
      <Container fluid>
        <Navbar.Brand>
          <Link to='/'>
            <img src={data.strapiCommon!.Logo!.url!} alt='Veszprém Blues Fesztivál logo' className={styles.navbar_logo} />
          </Link>
        </Navbar.Brand>
        <Nav className={styles.navbar_lang_switch_wrapper}>
            <Nav.Item>
              <DropdownButton title={language.toUpperCase()} variant={'light'} menuVariant={'dark'} className={styles.navbar_lang_switch_btn}>
                {languages.map((lng) => (
                  <Dropdown.Item key={lng} as={Link} to={originalPath} language={lng} className={styles.navbar_lang_switch_item}>
                    {lng.toUpperCase()}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Nav.Item>
          </Nav>
        <button aria-controls='responsive-navbar-nav' className={`navbar-toggler ${collapsed ? 'collapsed' : ''}`} onClick={() => setCollapsed(!collapsed)}>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <Navbar.Collapse id='responsive-navbar-nav' className={!collapsed ? 'show' : ''} >
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
          <Nav className={styles.navbar_social_wrapper}>
            <Nav.Item>
              <a href='https://www.facebook.com/veszprembluesfesztival' className={styles.navbar_icon_wrapper}><img alt='Facebook' src={data.strapiCommon!.FacebookIcon!.url!} className={styles.navbar_icon} /></a>
            </Nav.Item>
            <Nav.Item>
              <a href='https://www.facebook.com/veszprembluesfesztival' className={styles.navbar_icon_wrapper}><img alt='Instagram' src={data.strapiCommon!.InstagramIcon!.url!} className={styles.navbar_icon} /></a>
            </Nav.Item>
            <Nav.Item>
              <a href='#' className={styles.navbar_icon_wrapper}><img alt='Youtube' src={data.strapiCommon!.YoutubeIcon!.url!} className={styles.navbar_icon} /></a>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation