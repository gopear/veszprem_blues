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
    // <Col xs={12} md={5} xxl={2} className={`${styles.ticket_base} ${isPass ? styles.ticket_pass : styles.ticket_day} ${inactive ? styles.ticket_inactive : ''}`}>
    <div className={styles.ticket_wrapper}>
      <div className={`${styles.ticket_base} ${isPass ? styles.ticket_pass : styles.ticket_day} ${inactive ? styles.ticket_inactive : ''}`}>
        <span className={styles.ticket_title}>
            <h3><Trans>{title}</Trans></h3>
            <h4><Trans>{day}</Trans></h4>
        </span>
        <h4 className={styles.ticket_price}>{price} HUF</h4>
        <a className={styles.ticket_btn} href='https://cooltix.hu/event/637b299999c9e71b0efafb4e' style={{pointerEvents: inactive ? 'none' : 'inherit'}}><Trans>MEGVESZEM</Trans></a>
      </div>
    </div>
    // </Col>
  )
}

export default Ticket