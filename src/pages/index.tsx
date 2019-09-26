import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

export default ({ data }) => {
  return (
    <React.Fragment>
      <SEO />
      <Layout>
        <div id="blog_list">
          <h4>{data.allAsciidoc.totalCount} Posts</h4>
          {data.allAsciidoc.edges.map(({ node }) => (
            <div key={node.id}>
              <h3>
                <Link
                  css={css`
                    display: inline-block;
                  `}
                  to={node.fields.slug}
                >
                  {node.document.title}
                </Link>
                <small
                  css={css`
                    color: #bbb;
                  `}
                >
                  {node.revision !== null && ` - ${node.revision.date}`}
                </small>
              </h3>
              {/* <p>{node.excerpt}</p> */}
            </div>
          ))}
        </div>
      </Layout>
    </React.Fragment>
  )
}

export const query = graphql`
  query {
    allAsciidoc(
      filter: { pageAttributes: { draft: { eq: null } } }
      sort: { order: DESC, fields: [revision___date] }
    ) {
      totalCount
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
