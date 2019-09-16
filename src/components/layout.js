import React, { useEffect } from "react"
import { css } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"
import hljs from "highlight.js"

export default ({ tocLeft = false, children }) => {
  useEffect(() => {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block)
    })
  })

  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            links {
              linkedin
              github
            }
          }
        }
      }
    `
  )
  return (
    <div id={tocLeft && "asciidoc_body"}>
      <header
        css={{
          display: "flex",
          "flex-direction": "row",
          "flex-wrap": "nowrap",
          "justify-content": "space-between",
          padding: "1.25em 1em 0.25em",
          "& *": {
            "align-self": "flex-end",
          },
        }}
      >
        <Link to={`/`}>
          <h3
            css={css`
              margin: 0 auto;
            `}
          >
            {data.site.siteMetadata.title}
          </h3>
        </Link>
        <nav
          css={{
            "& ul>li": {
              "list-style-type": "none",
              float: "left",
              "& a": {
                padding: "0 5px",
              },
            },
          }}
        >
          <ul>
            <li>
              <a href={data.site.siteMetadata.links.linkedin}>About</a>
            </li>
            <li>
              <a href={data.site.siteMetadata.links.github}>GitHub</a>
            </li>
          </ul>
        </nav>
      </header>
      <section>{children}</section>
    </div>
  )
}
