import * as React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Article = styled.li`
  list-style: none;
`;

const List = styled.ul`
  margin-left: 0;
`;

const H3 = styled.h3`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  margin-bottom: 1.7rem;
`;

const Tags = ({ pageContext, data, location }) => {
  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <SEO title={`Articles Tagged With "${pageContext.tag}"`} />
      <h2>Articles Tagged With "{pageContext.tag}"</h2>
      <hr />
      <List>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <Article key={node.fields.slug}>
            <H3>
              <Link to={node.fields.slug}>{node.frontmatter.title}</Link> • 
              {node.frontmatter.date}
            </H3>
            <Description>{node.frontmatter.description}</Description>
            <hr />
          </Article>
        ))}
      </List>
      <Link to="/tags">Browse all tags »</Link>
    </Layout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            description
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
