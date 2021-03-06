/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

import { rhythm } from '../utils/typography';

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
            instagram
            github
          }
        }
      }
    }
  `);

  const { author, social } = data.site.siteMetadata;
  return (
    <div
      style={{
        display: `flex`,
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        <strong>{author}</strong> is a Senior Software Engineer on{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.hubspot.com"
        >
          HubSpot's
        </a>{' '}
        CRM Performance team. Outside of work he loves cycling, photography, and
        embarassing his friends by telling awful jokes in public. You can follow
        him on
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://twitter.com/${social.twitter}`}
        >
          {' '}
          Twitter,{' '}
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://instagram.com/${social.instagram}`}
        >
          Instagram,{' '}
        </a>
        and
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://github.com/${social.github}`}
        >
          {' '}
          GitHub.
        </a>
      </p>
    </div>
  );
};

export default Bio;
