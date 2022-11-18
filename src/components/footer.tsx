import { Link } from 'gatsby'
import React from 'react'
import { Row, Col, Container, Stack } from "react-bootstrap"
import * as styles from '../styles/layout.module.css'

const Footer = () => {
  return (
    <Container as="footer" className={styles.footer_wrapper} fluid>
        <Row className={styles.footer_row}>
            <Col xs={8} lg={4} className={styles.footer_col}>
                <Stack>
                    <h1>Gestalt Center Budapest</h1>
                    <a href="https://goo.gl/maps/VdzQmP1dB4LjudGh8">1145 Budapest, Törökőr utca 55.</a>
                </Stack>
            </Col>
            <Col xs={8} lg={4} className={styles.footer_col}>
                <Stack>
                    <h1>Honlap navigáció</h1>
                    <Link to='/bemutatkozas'>Bemutatkozás</Link>
                    <Link to='/csapatunk_tagjai'>Csapatunk Tagjai</Link>
                    <Link to='/szolgaltatasok'>Szolgáltatások</Link>
                    <Link to='/programok'>Programok</Link>
                    <Link to='/mi_a_gestalt'>Mi az a Gestalt?</Link>
                    <Link to='/galeria'>Galéria</Link>
                    <Link to='/kapcsolat'>Kapcsolat</Link>
                </Stack>
            </Col>
            <Col xs={8} lg={4} className={styles.footer_col}>
                <Stack>
                    <h1>Kapcsolat</h1>
                    <Link to='/csapatunk_tagjai#jokay'>Jókay Rita</Link>
                    <a href='mailto:rita.jokay@gmail.com'>rita.jokay@gmail.com</a>
                    <a href='tel:+36 30 560 5584'>+36 30 560 5584</a>
                </Stack>
            </Col>
        </Row>
    </Container>
  )
}

export default Footer