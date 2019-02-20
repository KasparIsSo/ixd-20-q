const BREAKPOINTS = {
	mobile: {
		small: "375px",
		large: "480px"
	},
	tablet: {
		small: "840px",
		large: "1000px"
	},
	desktop: {
		small: "1280px",
		large: "1440px"
	}
};

const GRID = {
	wrapper: `
    display: block;
    margin: 0 auto;
    width: calc(100vw - 4rem);
    max-width: 960px;

    @media (max-width: ${BREAKPOINTS.tablet.large}) {
      max-width: calc(100vw - 4rem);
    }

    @media (max-width: ${BREAKPOINTS.mobile.large}) {
      max-width: calc(100vw - 2rem);
    }
  `,
	container: `
    display: grid;
    max-width: 60rem;
    grid-template-columns: repeat( 12, 1fr );
    grid-gap: 1rem;

    @media (max-width: ${BREAKPOINTS.tablet.large}) {
      max-width: calc(100vw - 4rem);
      grid-template-columns: repeat( 8, 1fr );
    }

    @media (max-width: ${BREAKPOINTS.mobile.large}) {
      max-width: calc(100vw - 2rem);
      grid-template-columns: repeat( 4, 1fr );
    }
  `,
	flex: {
		max: `
      grid-column: span 12;
      @media (max-width: ${BREAKPOINTS.tablet.large}) {
        grid-column: span 8;
      }
  
      @media (max-width: ${BREAKPOINTS.mobile.large}) {
        grid-column: span 4;
      }
    `,
		s1: `
      grid-column: span 1;
      @media (max-width: ${BREAKPOINTS.tablet.large}) {
        grid-column: span 8;
      }
  
      @media (max-width: ${BREAKPOINTS.mobile.large}) {
        grid-column: span 4;
      }
    `,
		s2: `
      grid-column: span 2;
      @media (max-width: ${BREAKPOINTS.tablet.large}) {
        grid-column: span 1;
      }
  
      @media (max-width: ${BREAKPOINTS.mobile.large}) {
        grid-column: span 2;
      }
    `,
		s3: `
      grid-column: span 3;
      @media (max-width: ${BREAKPOINTS.tablet.large}) {
        grid-column: span 4;
      }
  
      @media (max-width: ${BREAKPOINTS.mobile.large}) {
        grid-column: span 4;
      }
    `,
		s4: `
      grid-column: span 4;
      @media (max-width: ${BREAKPOINTS.tablet.large}) {
        grid-column: span 4;
      }
  
      @media (max-width: ${BREAKPOINTS.mobile.large}) {
        grid-column: span 4;
      }
    `,
		s5: `
      grid-column: span 5;
      @media (max-width: ${BREAKPOINTS.tablet.large}) {
        grid-column: span 4;
      }
  
      @media (max-width: ${BREAKPOINTS.mobile.large}) {
        grid-column: span 4;
      }
    `,
		s6: `
      grid-column: span 6;
      @media (max-width: ${BREAKPOINTS.tablet.large}) {
        grid-column: span 4;
      }
  
      @media (max-width: ${BREAKPOINTS.mobile.large}) {
        grid-column: span 4;
      }
    `,
		s7: `
      grid-column: span 7;
      @media (max-width: ${BREAKPOINTS.tablet.large}) {
        grid-column: span 8;
      }
  
      @media (max-width: ${BREAKPOINTS.mobile.large}) {
        grid-column: span 4;
      }
    `,
		s8: `
      grid-column: span 8;
      @media (max-width: ${BREAKPOINTS.tablet.large}) {
        grid-column: span 8;
      }
  
      @media (max-width: ${BREAKPOINTS.mobile.large}) {
        grid-column: span 4;
      }
    `,
		s9: `
      grid-column: span 9;
      @media (max-width: ${BREAKPOINTS.tablet.large}) {
        grid-column: span 8;
      }
  
      @media (max-width: ${BREAKPOINTS.mobile.large}) {
        grid-column: span 4;
      }
    `,
		s10: `
      grid-column: span 10;
      @media (max-width: ${BREAKPOINTS.tablet.large}) {
        grid-column: span 8;
      }
  
      @media (max-width: ${BREAKPOINTS.mobile.large}) {
        grid-column: span 4;
      }
    `,
		s11: `
      grid-column: span 11;
      @media (max-width: ${BREAKPOINTS.tablet.large}) {
        grid-column: span 8;
      }
  
      @media (max-width: ${BREAKPOINTS.mobile.large}) {
        grid-column: span 4;
      }
    `
	}
};

export { GRID, BREAKPOINTS };
