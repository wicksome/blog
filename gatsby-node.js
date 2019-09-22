const path = require(`path`)
const slash = require(`slash`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const htmlToText = require("html-to-text")

// https://www.gatsbyjs.org/docs/node-apis/#createPages
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(
    `
      {
        allAsciidoc(sort: { order: DESC, fields: [revision___date] }) {
          edges {
            node {
              id
              html
              document {
                title
              }
              revision {
                date
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create Asciidoc pages.
    const articleTemplate = path.resolve(`./src/templates/Article.tsx`)
    const posts = result.data.allAsciidoc.edges
    posts.forEach(({ node }, index) => {
      createPage({
        path: node.fields.slug,
        component: slash(articleTemplate),
        context: {
          id: node.id,
          slug: node.fields.slug,
          next: index === posts.length - 1 ? null : posts[index + 1].node,
          prev: index === 0 ? null : posts[index - 1].node,
        },
      })
    })
  })
}

// https://www.gatsbyjs.org/docs/node-apis/#onCreateNode
exports.onCreateNode = async ({ node, actions, getNode, loadNodeContent }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Asciidoc`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })

    // make description for og tag
    // TODO: Set description of OG tag if hasn't description metadata
    const partOfBody = htmlToText
      .fromString(node.html, {
        baseElement: "div#content",
        ignoreImage: true,
        singleNewLineParagraphs: true,
      })
      .slice(0, 300)
      .replace(/(?:\r\n|\r|\n)/g, " ")
  }
}
