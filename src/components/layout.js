import React, { useEffect } from "react"
import { css } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"
import hljs from "highlight.js"
import { black } from "ansi-colors"

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
      <header id="blog_header">
        <Link to={`/`}>
          <h3 className="blog-title underlined underlined--thick">
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
                color: "#000",
              },
            },
          }}
        >
          <ul>
            <li>
              <a
                className="underlined underlined--offset"
                href={data.site.siteMetadata.links.linkedin}
              >
                About
              </a>
            </li>
            <li>
              <a
                className="underlined underlined--offset"
                href={data.site.siteMetadata.links.github}
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <section>{children}</section>
    </div>
  )
}
