const path = require(`path`)
const slash = require(`slash`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(
    `
      {
        allAsciidoc(sort: { fields: [revision___date], order: DESC }) {
          edges {
            node {
              id
              document {
                title
              }
              pageAttributes {
                category
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
    const articleTemplate = path.resolve(`./src/templates/article.tsx`)

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

exports.onCreateNode = async ({ node, actions, getNode, loadNodeContent }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Asciidoc`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
