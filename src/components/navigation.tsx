import { graphql, Link, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav } from "react-bootstrap"
import * as styles from '../styles/layout.module.css'
import { WindowLocation } from "@reach/router"

const Navigation = ({ location } : { location : WindowLocation }) => {

  const [scroll, setScroll] = useState(false)
  const [collapsed, setCollapsed] = useState(true)
  const isMainPage = location.pathname === '/'

  if (!collapsed) {
    document.body.style.overflowY = 'hidden'
  } else {
    document.body.style.overflowY = 'visible'
  }
  
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 250);
    });
  }, [])

  const data = useStaticQuery<Queries.HeaderCompQuery>(graphql`
    query HeaderComp {
      strapiCommon {
        Logo {
          url
        }
      }
    }
  `)

  return (
    <Navbar style={{ background: scroll || !isMainPage ?  "rgb(117, 140, 171)" : "transparent"}} className={styles.navbar_wrapper} fixed={'top'} expand='xl'>
        <Container fluid>
            <Navbar.Brand>
                <Link to='/'>
                    <img src={data.strapiCommon?.Logo?.url || ''} alt='Gestalt logo' className={styles.navbar_logo}/>
                </Link>
            </Navbar.Brand>
            <button aria-controls='responsive-navbar-nav' className={`navbar-toggler ${collapsed ? 'collapsed' : ''}`} onClick={() => setCollapsed(!collapsed)}>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Navbar.Collapse id='responsive-navbar-nav' className={!collapsed ? 'show' : ''} style={{ overflowY: !collapsed ? 'hidden' : 'visible' }}>
              <Nav className={styles.navbar_item_wrapper}>
                <Nav.Item>
                  <Link to='/bemutatkozas'>Bemutatkozás</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to='/szolgaltatasok'>Szolgáltatások</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to='/programok'>Programok</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to='/mi_a_gestalt'>Mi az a Gestalt?</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to='/galeria'>Galéria</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to='/kapcsolat'>Kapcsolat</Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>     
  )
}

export default Navigation