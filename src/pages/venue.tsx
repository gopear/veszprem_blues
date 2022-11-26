import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { graphql, HeadProps, PageProps } from 'gatsby';
import React from 'react'
import { Col, Container, Row, Stack } from 'react-bootstrap';
import Layout from '../components/layout';
import { SEO } from '../components/seo';
import UnderConstruction from '../components/under_construction';
import * as styles from "../styles/venue.module.css"

const Venue = ({ data }: PageProps<Queries.VenuePageQuery>)  => {

  const links = [
    {data: data.strapiIndex?.Sponsors?.find(el => el!.Link === 'https://hangvilla.com'), position: {lat: 47.09183284455138, lng: 17.90921478917739}, label: 'Hangvilla'},
    {data: data.strapiIndex?.Sponsors?.find(el => el!.Link === 'http://expresszo.hu'), position: {lat: 47.09196031900519, lng: 17.909099791619717}, label: 'Expresszó'},
    {data: data.strapiIndex?.Sponsors?.find(el => el!.Link === 'https://www.facebook.com/papirkutya.veszprem/'), position: {lat: 47.09290317083471, lng: 17.907879188627607}, label: 'Papírkutya'},
  ]

  return (
    <Layout bg_color='white' main_style={{display: 'flex'}}>
      <Container fluid style={{display: 'flex'}}>
        <Row className={styles.row_wrapper}>
          <Col xs={7} className={styles.left_col}>
            <div className={styles.description_wrapper}>
              <span dangerouslySetInnerHTML={{__html: data.strapiVenue?.Description?.data?.childMarkdownRemark?.html!}}/>
              <LoadScript
                googleMapsApiKey='AIzaSyB_YvU-H1MNOuRqm5hlsh6tAZkLj7XsRZ8'>
                <GoogleMap
                  mapContainerStyle={{
                    height: "600px",
                    width: "600px"
                  }}
                  zoom={18}
                  center={{
                    lat: 47.0923736869941, 
                    lng: 17.908637228968374
                  }}>
                  {links.map(p => (
                    <Marker key={p.data?.Link} position={p.position}/>
                  ))}
                </GoogleMap>
              </LoadScript>
            </div>
            
          </Col>
          <Col xs={3} className={styles.right_col}>
            <img alt='pin' src={data.strapiVenue!.PinImage!.localFile!.url!}/>
            <Stack direction="horizontal" className={styles.sponsor_wrapper}>
                {links.map(s => (
                  <a key={s!.data!.Link!} href={s!.data!.Link!}>
                    <img alt={s!.data!.Link!} src={s!.data!.Logo!.url!}/>
                  </a>
                ))}
            </Stack>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Venue

export const Head = ({ data }: HeadProps<Queries.VenuePageQuery>) => <SEO title={JSON.parse(data.seo!.data!).seo}/>

export const query = graphql`
query VenuePage($language: String!) {
  locales: allLocale(filter: {language: {eq: $language}}) {
    edges {
      node {
        ns
        data
        language
      }
    }
  }
  seo: locale(language: {eq: $language}, ns: {eq: "venue"}) {
    data
  }
  strapiVenue {
    Description {
      data {
        childMarkdownRemark {
          html
        }
      }
    }
    PinImage {
      localFile {
        url
      }
    }
  }
  strapiIndex {
    Sponsors {
      Link
      Logo {
        url
      }
    }
  }
  wip:file(name: {eq: "vbf_underconstruction"}, sourceInstanceName: {eq: $language}) {
    publicURL
  }
}
`;