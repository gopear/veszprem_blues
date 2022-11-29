import { graphql, HeadProps, PageProps } from 'gatsby';
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Layout from '../components/layout';
import { SEO } from '../components/seo';
import UnderConstruction from '../components/under_construction';

const Contact = ({ data }: PageProps<Queries.ContactPageQuery>)  => {
  return (
    <Layout>
      <Container>
        <UnderConstruction url={data.wip!.publicURL!}/>
      </Container>
    </Layout>
  )
}

export default Contact

export const Head = ({ data }: HeadProps<Queries.ContactPageQuery>) => <SEO title={JSON.parse(data.seo!.data!).seo}/>

export const query = graphql`
query ContactPage($language: String!) {
  locales: allLocale(filter: {language: {eq: $language}}) {
    edges {
      node {
        ns
        data
        language
      }
    }
  }
  seo: locale(language: {eq: $language}, ns: {eq: "contact"}) {
    data
  }
  wip:file(name: {eq: "vbf_underconstruction"}, sourceInstanceName: {eq: $language}) {
    publicURL
  }
}
`;