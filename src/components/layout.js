import React, { useEffect } from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import hljs from "highlight.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons"

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
        <nav id="blog_nav">
          <ul>
            <li>
              <a
                className="underlined underlined--offset"
                href={data.site.siteMetadata.links.linkedin}
              >
                <FontAwesomeIcon icon={faLinkedinIn} fixedWidth />
              </a>
            </li>
            <li>
              <a
                className="underlined underlined--offset"
                href={data.site.siteMetadata.links.github}
              >
                <FontAwesomeIcon icon={faGithub} fixedWidth />
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <section>{children}</section>
    </div>
  )
}
