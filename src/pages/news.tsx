import { graphql, HeadProps, PageProps } from 'gatsby';
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Layout from '../components/layout';
import { SEO } from '../components/seo';
import UnderConstruction from '../components/under_construction';

const News = ({ data }: PageProps<Queries.NewsPageQuery>)  => {
  return (
    <Layout>
      <Container>
        <UnderConstruction url={data.wip!.publicURL!}/>
      </Container>
    </Layout>
  )
}

export default News

export const Head = ({ data }: HeadProps<Queries.NewsPageQuery>) => <SEO title={JSON.parse(data.seo!.data!).seo}/>

export const query = graphql`
query NewsPage($language: String!) {
  locales: allLocale(filter: {language: {eq: $language}}) {
    edges {
      node {
        ns
        data
        language
      }
    }
  }
  seo: locale(language: {eq: $language}, ns: {eq: "news"}) {
    data
  }
  wip:file(name: {eq: "vbf_underconstruction"}, sourceInstanceName: {eq: $language}) {
    publicURL
  }
}
`;