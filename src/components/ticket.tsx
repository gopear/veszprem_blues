import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react'
import { Col } from 'react-bootstrap';
import * as styles from "../styles/layout.module.css"

interface TicketProps {
    title: string;
    day: string;
    price: string;
    isPass?: boolean;
    inactive?: boolean;
}

const Ticket = ({ title, day, price, isPass = false, inactive = false } : TicketProps) => {
  return (
    <Col xs={12} md={5} xxl={2} className={`${styles.ticket_base} ${isPass ? styles.ticket_pass : ''} ${inactive ? styles.ticket_inactive : ''}`}>
        <span>
            <h3><Trans>{title}</Trans></h3>
            <h2><Trans>{day}</Trans></h2>
        </span>
        <h2>{price} HUF</h2>
        <button className={styles.ticket_btn}><Trans>MEGVESZEM</Trans></button>
    </Col>
  )
}

export default Ticket