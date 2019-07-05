import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { rhythm, scale } from '../utils/typography';
import 'prism-themes/themes/prism-a11y-dark.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import '../prism-numbers-custom.css';

const EDGE_COLOR = 'rgba(64,191,255, 0.3)';

const Footer = styled.div`
  padding-top: 1.5rem;
  font-size: 0.8rem;
  position: absolute;
  bottom: 50px;
`;

const Container = styled.div`
  min-height: 100vh;
  position: relative;
  background-image: linear-gradient(
    to right,
    ${EDGE_COLOR},
    white 10%,
    white 90%,
    ${EDGE_COLOR}
  );
`;

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      );
    } else {
      header = (
        <h3
          style={{
            ...scale(0.2),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            « Back to home
          </Link>
        </h3>
      );
    }
    return (
      <Container>
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <header>{header}</header>
          <main>{children}</main>
          <Footer>
            © Adam Markon 2019 - {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </Footer>
        </div>
      </Container>
    );
  }
}

export default Layout;
