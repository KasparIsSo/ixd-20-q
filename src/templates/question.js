import React from "react";
import styled from "styled-components";
import { withPrefix, graphql, Link } from "gatsby";

import Header from "../components/header";
import "../components/layout";
import SEO from "../components/seo";
import Layout from "../components/layout";

import {
	camelize,
	commaParse,
	mapLinks
} from "../components/utilities/parsing";

import { GRID, BREAKPOINTS } from "../style/layout";
import THEME from "../style/theme";
import TYPE from "../style/typography";

const Wrapper = styled.div`
	${GRID.wrapper}
`;

const Content = styled.div`
	${GRID.container}
	padding: 3.75rem 0 2rem;

	@media (max-width: ${BREAKPOINTS.tablet.large}) {
		padding: 2rem 0 2rem;
	}

	@media (max-width: ${BREAKPOINTS.mobile.large}) {
		padding: 1.5rem 0 2rem;
	}
`;

const QuickNavPrev = styled(Link)`
	${TYPE.body}
	display: inline-block;
	text-decoration: none;
	${GRID.flex.s2}
`;

const QuickNavNext = styled(Link)`
	${TYPE.body}
	display: inline-block;
	text-decoration: none;
	${GRID.flex.s2}
	text-align: right;
	grid-column-end: 13;
	@media (max-width: ${BREAKPOINTS.tablet.large}) {
		grid-column-end: 9;
	}

	@media (max-width: ${BREAKPOINTS.mobile.large}) {
		grid-column-end: 5;
	}
`;

const DisplaySketch = styled.div`
	grid-column: 1 /13;
	background: ${THEME.black.true};
	position: relative;
	canvas {
		position: absolute;
		left: 0;
		top: 0;
	}

	@media (max-width: ${BREAKPOINTS.tablet.large}) {
		grid-column: 1 /9;
	}

	@media (max-width: ${BREAKPOINTS.mobile.large}) {
		grid-column: 1 /5;
	}
`;

const SketchPlaceholder = styled.div`
	width: 100%;
	padding-top: 50%;
`;

const ProjectTitle = styled.div`
	grid-column: 1 /11;
	${TYPE.display}
	font-family: "Gilroy-Medium";
	margin-bottom: 1.25rem;

	@media (max-width: ${BREAKPOINTS.tablet.large}) {
		grid-column: 1 /9;
	}

	@media (max-width: ${BREAKPOINTS.mobile.large}) {
		grid-column: 1 /5;
	}
`;

const Stats = styled.div`
	grid-column-start: 1;
	grid-column-end: 5;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 1.5rem;
	grid-auto-rows: min-content;
`;

const StatTitle = styled.h4`
	${TYPE.body}
	font-family: "Gilroy-Bold";
	margin-bottom: 0;
`;

const StatSection = styled.div`
	grid-column: span 1;
	${TYPE.body}

	a {
		text-decoration: none;
		color: ${THEME.white.true};
	}
`;

const Summary = styled.div`
	grid-column-start: 5;
	grid-column-end: 13;
	${TYPE.body}
	color: #fff;

	@media (max-width: ${BREAKPOINTS.tablet.large}) {
		grid-column: 5 /9;
	}

	@media (max-width: ${BREAKPOINTS.mobile.large}) {
		grid-column: 1 /5;
	}
`;

function twoDigit(n) {
	let k = parseInt(n);
	if (k < 10) {
		k = "0" + k;
	}
	return k;
}

class PlayPostTemplate extends React.Component {
	componentDidMount() {
		let k = twoDigit(this.props.data.markdownRemark.frontmatter.questionNumber);
		let script = document.createElement("script");
		script.src = withPrefix(`${k}/sketch.js`);

		let p5Lib = document.createElement("script");
		p5Lib.src = withPrefix(`sketches/p5.min.js`);
		p5Lib.onload = function() {
			console.log("p5");
			document.body.appendChild(p5Dom);
		};

		let p5Dom = document.createElement("script");
		p5Dom.src = withPrefix(`sketches/p5.dom.js`);
		p5Dom.onload = function() {
			console.log("p5 dom");
			document.body.appendChild(script);
		};

		document.body.appendChild(p5Lib);
	}

	render() {
		const markdownRemark = this.props.data.markdownRemark; // data.markdownRemark holds our post data
		const { frontmatter, html } = markdownRemark;

		const questionNumber = parseInt(frontmatter.questionNumber);

		const title = "Q." + questionNumber;

		const prev = questionNumber - 1 <= 0 ? "Home" : questionNumber - 1;
		const pLink = prev == "Home" ? "./" : "./question/" + twoDigit(prev);

		const next = questionNumber + 1 > 20 ? "Home" : questionNumber + 1;
		const nLink = next == "Home" ? "./" : "./question/" + twoDigit(next);

		return (
			<Layout>
				<SEO title={title} />
				<Wrapper>
					<Content>
						<QuickNavPrev to={pLink}>← Q.{prev}</QuickNavPrev>
						<QuickNavNext to={nLink}>Q.{next}→</QuickNavNext>
						<ProjectTitle>{frontmatter.title}</ProjectTitle>
						<DisplaySketch id="display-sketch">
							<SketchPlaceholder />
						</DisplaySketch>
						<Stats>
							<StatSection>
								<StatTitle>Last Updated</StatTitle>
								{frontmatter.date}
							</StatSection>
							<StatSection>
								<StatTitle>GitHub</StatTitle>
								{frontmatter.github}
							</StatSection>
							<StatSection>
								<StatTitle>Libraries</StatTitle>
								{mapLinks(
									commaParse(frontmatter.libraries),
									commaParse(frontmatter.libraryLinks)
								)}
							</StatSection>
							<StatSection>
								<StatTitle>Themes</StatTitle>
								{frontmatter.themes}
							</StatSection>
						</Stats>
						<Summary dangerouslySetInnerHTML={{ __html: html }} />
					</Content>
				</Wrapper>
			</Layout>
		);
	}
}

export default PlayPostTemplate;

export const pageQuery = graphql`
	query($path: String!) {
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			html
			frontmatter {
				path
				title
				questionNumber
				date(formatString: "MMMM YYYY")
				github
				libraries
				libraryLinks
				themes
				summary
			}
		}
	}
`;
