import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';

const EndOfStory = styled.div`
  font-size: 1.5rem;
  margin-top: -1rem;
  margin-bottom: 0.8rem;
`;

const Tags = styled.p`
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  font-style: italic;
`;

const TweetButton = styled.a`
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #00aced;
  padding: 5px 10px;
  margin: 20px;
  font-size: 0.9rem;
  position: relative;
  top: -4px;
  transition: background-color 0.3s;
  transition: color 0.3s;

  &:hover {
    background-color: #00aced;
    color: #ffffff;
  }
`;

class BlogPostTemplate extends React.Component {
  getTweet = () => {
    return `"${this.props.data.markdownRemark.frontmatter.title}" by @amarkon88 https://perf.markon.codes${this.props.pageContext.slug}`;
  };

  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next } = this.props.pageContext;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <h1
          style={{
            marginTop: rhythm(1),
            marginBottom: 0,
          }}
        >
          {post.frontmatter.title}
        </h1>
        <Tags>
          Tags:{' '}
          {post.frontmatter.tags.map((tag, idx) => (
            <Link to={`tag/${tag}`}>
              {tag}
              {idx < post.frontmatter.tags.length - 1 ? ', ' : ''}
            </Link>
          ))}
        </Tags>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
          }}
        >
          {post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <EndOfStory>
          ⏭
          <TweetButton
            href={`https://twitter.com/home?status=${encodeURI(
              this.getTweet()
            )}`}
            target="_blank"
            rel="noopener nofollow noreferrer"
          >
            Share this post on Twitter
          </TweetButton>
        </EndOfStory>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
  }
`;
