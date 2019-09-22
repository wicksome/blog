import React, { useEffect } from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import { go, filter } from "fxjs2"
import hljs from "highlight.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons"

interface Props {
  toc?: string
}

const defaultProps: Props = {
  toc: null,
}

const Layout: React.SFC<Props> = ({ toc, children }) => {
  useEffect(() => {
    if (!toc) {
      document.body.classList.remove(
        ...go(document.body.classList, filter(clz => /^toc.*/.test(clz)))
      )
    } else if (!!toc && toc !== "toc") {
      document.body.classList.add("toc2", `toc-${toc}`)
    }

    // apply source code highlight
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block)
    })
  })

  const {
    site: { metadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          metadata: siteMetadata {
            title
            social {
              linkedin
              github
              twitter
            }
          }
        }
      }
    `
  )
  return (
    <div>
      <header id="blog_header">
        <Link to={`/`}>
          <h3 className="blog-title underlined underlined--thick">
            {metadata.title}
          </h3>
        </Link>
        <nav id="blog_nav">
          <ul>
            <li>
              <a
                className="underlined underlined--offset"
                href={`https://www.linkedin.com/in/${metadata.social.linkedin}`}
              >
                <FontAwesomeIcon icon={faLinkedinIn} size="xs" fixedWidth />
              </a>
            </li>
            <li>
              <a
                className="underlined underlined--offset"
                href={`https://github.com/${metadata.social.github}`}
              >
                <FontAwesomeIcon icon={faGithub} size="xs" fixedWidth />
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <section>{children}</section>
    </div>
  )
}
Layout.defaultProps = defaultProps

export default Layout
