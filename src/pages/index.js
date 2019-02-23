import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import Layout from "../components/layout";
// import Image from "../components/image";
import SEO from "../components/seo";
import TYPE from "../style/typography";
import { GRID, BREAKPOINTS } from "../style/layout";

const Wrapper = styled.div`
  ${GRID.wrapper}
`;

const Intro = styled.div`
  ${GRID.container}
`;

const Heading = styled.h2`
  ${TYPE.display} /* font-weight: lighter; */
	padding: 3.75rem 0 0;
  grid-column-start: 1;
  grid-column-end: 9;

  @media (max-width: ${BREAKPOINTS.tablet.large}) {
    grid-column-start: 1;
    grid-column-end: 8;
  }

  @media (max-width: ${BREAKPOINTS.mobile.large}) {
    grid-column-start: 1;
    grid-column-end: 5;
  }
`;

const BodyParagraph = styled.p`
  ${TYPE.body} /* font-weight: lighter; */
	padding: 0 0 2rem;
  grid-column-start: 1;
  grid-column-end: 9;

  @media (max-width: ${BREAKPOINTS.tablet.large}) {
    grid-column-start: 1;
    grid-column-end: 8;
  }

  @media (max-width: ${BREAKPOINTS.mobile.large}) {
    grid-column-start: 1;
    grid-column-end: 5;
  }
`;

const IndexPage = () => (
  <Layout>
    <Wrapper>
      <Intro>
        <SEO
          title={`Home`}
          keywords={[`UX Engineer`, `Web`, `Developer`, `Frontend`, `Designer`]}
        />
        <Heading>
          Here are 20 qustions and 20 creative coding sketches to go along with
          each.{" "}
        </Heading>
        <BodyParagraph>
          This experience is designed for desktop viewing. (It shouldn't break
          too bad on mobile)
        </BodyParagraph>
      </Intro>
    </Wrapper>
  </Layout>
);

export default IndexPage;
