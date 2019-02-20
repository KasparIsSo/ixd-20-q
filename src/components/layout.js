import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

import { createGlobalStyle } from "styled-components";
import Header from "./header";
import "./layout.css";
import THEME from "../style/theme";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "Gilroy-Bold";
    src: url("Gilroy-Bold.eot");
    src: url("../assets/fonts/Gilroy-Bold.eot?#iefix") format("embedded-opentype"),
         url("../assets/fonts/Gilroy-Bold.woff2") format("woff2"),
         url("../assets/fonts/Gilroy-Bold.woff") format("woff"),
         url("../assets/fonts/Gilroy-Bold.ttf") format("ttf"),
         url("../assets/fonts/Gilroy-Bold.svg#Gilroy-Bold") format("svg");
    font-style: normal;
  }

  @font-face {
    font-family: "Gilroy-Medium";
    src: url("Gilroy-Medium.eot");
    src: url("../assets/fonts/Gilroy-Medium.eot?#iefix") format("embedded-opentype"),
         url("../assets/fonts/Gilroy-Medium.woff2") format("woff2"),
         url("../assets/fonts/Gilroy-Medium.woff") format("woff"),
         url("../assets/fonts/Gilroy-Medium.ttf") format("ttf"),
         url("../assets/fonts/Gilroy-Medium.svg#Gilroy-Medium") format("svg");
    font-style: normal;
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
