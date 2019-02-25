import React from "react";
import PropTypes from "prop-types";
import { withPrefix, StaticQuery, graphql } from "gatsby";

import { createGlobalStyle } from "styled-components";
import Header from "./header";
import "./layout.css";
import THEME from "../style/theme";
import GilroyBold from "../assets/fonts/Gilroy-Bold.woff";
import GilroyMedium from "../assets/fonts/Gilroy-Medium.woff";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Gilroy-Bold';
    font-style: normal;
    src: local('Gilroy-Bold'), url(${GilroyBold}) format('woff');
  }

  @font-face {
    font-family: 'Gilroy-Medium';
    font-style: normal;
    font-weight: 300;
    src: local('Gilroy-Medium'), url(${GilroyMedium}) format('woff');
  }

  body {
    @import url('https://fonts.googleapis.com/css?family=Lato:300,700');
    font-family: 'Gilroy-Medium', sans-serif;
    background-color: ${THEME.black.base};
  }
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <GlobalStyles />
        {children}
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
