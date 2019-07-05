import * as React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';

const List = styled.ul`
  margin-left: 0;
`;

const H3 = styled.h3`
  margin-top: 1rem;
`;

const formatTag = string => {
  const sanitized = string.replace('-', ' ');
  return `${sanitized.substring(0, 1).toUpperCase()}${sanitized.substring(1)}`;
};

const Tags = ({ data, location }) => {
  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <SEO title="Tags" />
      <h2>See articles tagged with...</h2>
      <List>
        {data.allMarkdownRemark.group
          .sort((a, b) => a.fieldValue > b.fieldValue)
          .map(({ fieldValue, totalCount }) => (
            <React.Fragment>
              <H3>
                <Link to={`/tag/${fieldValue}`}>{formatTag(fieldValue)}</Link> •{' '}
                {totalCount} {totalCount === 1 ? 'article' : 'articles'}
              </H3>
            </React.Fragment>
          ))}
      </List>
    </Layout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
