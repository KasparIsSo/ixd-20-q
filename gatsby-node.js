const path = require("path");

exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions;

	// const projectTemplate = path.resolve(`src/templates/project.js`);
	const playTemplate = path.resolve(`src/templates/question.js`);

	return graphql(
		`
			{
				allMarkdownRemark(limit: 1000) {
					edges {
						node {
							html
							frontmatter {
								path
								docType
								title
							}
						}
					}
				}
			}
		`
	).then(result => {
		if (result.errors) {
			return Promise.reject(result.errors);
		}

		result.data.allMarkdownRemark.edges.forEach(({ node }) => {
			if (node.frontmatter.docType == "Question") {
				createPage({
					path: node.frontmatter.path,
					component: playTemplate,
					context: {} // additional data can be passed via context
				});
			}
			// else {
			// 	createPage({
			// 		path: node.frontmatter.path,
			// 		component: projectTemplate,
			// 		context: {} // additional data can be passed via context
			// 	});
			// }
		});
	});
};
