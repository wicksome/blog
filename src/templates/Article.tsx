import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import Utterances from "utterances-react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import TagList from "../components/TagList"

// export default ({ data: { asciidoc }, yj }) => {
export default ({ data }) => {
  const asciidoc = data.asciidoc
  const { html, pageAttributes: attr } = asciidoc
  let toc = null

  // init toc
  if (attr.toc === null) toc = null
  else if (attr.toc !== null && attr.toc.length === 0) toc = "toc"
  else toc = attr.toc // "left" or "right"

  return (
    <React.Fragment>
      <SEO
        title={asciidoc.document.title}
        pathname={asciidoc.fields.slug}
        article
      />
      <Layout toc={toc}>
        <article id="asciidoctor" dangerouslySetInnerHTML={{ __html: html }} />
        <TagList
          tags={attr.tags ? attr.tags.split(",").map(tag => tag.trim()) : []}
        />
        <Utterances
          repo="wicksome/blog"
          label="🏷"
          style={`
            & .utterances {
              max-width: 950px;
            }
          `}
        />
      </Layout>
    </React.Fragment>
  )
}

export const query = graphql`
  query($id: String!) {
    asciidoc(id: { eq: $id }) {
      html
      document {
        title
      }
      revision {
        date
        number
      }
      fields {
        slug
      }
      pageAttributes {
        toc
        tags
      }
    }
  }
`
