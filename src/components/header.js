import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { BREAKPOINTS, GRID } from "../style/layout";
import TYPE from "../style/typography";
import THEME from "../style/theme";

const Nav = styled.div`
  width: 100vw;
`;

const NavWrapper = styled.div`
  ${GRID.wrapper}
  padding: 1rem 0;
`;

const NavContainer = styled.div`
  ${GRID.container}
`;

const Logo = styled.div`
  grid-column-start: 1;
  ${TYPE.heading}
`;

const NavLinksWrapper = styled.div`
  grid-column-start: 1;
  > .active {
    border: solid 1px ${THEME.highlight.gold};
  }
`;

const NavLink = styled(Link)`
  margin-right: 1rem;
  padding: 0.25rem;
  ${TYPE.body}
  font-weight: 700;
  text-decoration: none;
`;

function generateLinks() {
  let links = new Array();
  for (let i = 1; i < 21; i++) {
    let k;
    if (i < 10) {
      k = "0" + i;
    } else {
      k = i;
    }
    let kLink = "/question/" + k + "/";
    links.push(<NavLink to={kLink}>{i}</NavLink>);
  }
  return links;
}

const Header = ({ siteTitle }, pro = "nav") => (
  <Nav>
    <NavWrapper>
      <NavContainer>
        <Logo>Kaspar | 20</Logo>
        <NavLinksWrapper className="navLinks">
          {generateLinks()}
        </NavLinksWrapper>
      </NavContainer>
    </NavWrapper>
  </Nav>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
