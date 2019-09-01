import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <div>
        <h1
          css={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          Amazing Pandas Eating Things
        </h1>
        <h4>{data.allAsciidoc.totalCount} Posts</h4>
        {data.allAsciidoc.edges.map(({ node }) => (
          <div key={node.id}>
            <h3
              css={css`
                margin-bottom: ${rhythm(1 / 4)};
              `}
            >
              {node.document.title}{" "}
              <span
                css={css`
                  color: #bbb;
                `}
              >
                — {node.revision !== null && node.revision.date}
              </span>
            </h3>
            {/* <p>{node.excerpt}</p> */}
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allAsciidoc {
      totalCount
      edges {
        node {
          id
          html
          document {
            title
            main
          }
          revision {
            date
          }
        }
      }
    }
  }
`
