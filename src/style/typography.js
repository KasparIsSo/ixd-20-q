import THEME from "./theme";
import { BREAKPOINTS } from "./layout";

const TYPE = {
	display: `
    font-family: Gilroy-Medium, sans-serif;
    font-size: 2.5rem;
    line-height: 3.125rem;
    font-weight: normal;
    color: ${THEME.white.true};
  `,
	heading: `
    font-family: Gilroy-Bold, sans-serif;
    font-size: 1.25rem;
    line-height: 1.875rem;
    letter-spacing: 0.03rem;
    color: ${THEME.white.true};

    @media (max-width: ${BREAKPOINTS.tablet.large}) {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  `,
	headingLight: `
    font-family: Gilroy-Medium, sans-serif;
    font-size: 1.25rem;
    line-height: 1.875rem;
    letter-spacing: 0.03rem;
    color: ${THEME.white.true};
    font-weight: 200;

    @media (max-width: ${BREAKPOINTS.tablet.large}) {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  `,
	body: `
    font-family: Lato, sans-serif;
    font-size: .875rem;
    font-weight: 300;
    line-height: 1.625rem;
    letter-spacing: 0.03rem;
    color: ${THEME.white.true};
  `
};

export default TYPE;
