import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Utterances, UtterancesStyle } from "../components/utterances"

export default ({ data: { asciidoc } }) => {
  // const isProduction = process.env.NODE_ENV === "production"
  const isProduction = true
  const { html, pageAttributes: attr } = asciidoc
  let toc = null

  // init toc
  if (attr.toc === null) toc = null
  else if (attr.toc !== null && attr.toc.length === 0) toc = "toc"
  else toc = attr.toc // "left" or "right"

  return (
    <Layout toc={toc}>
      <article id="asciidoctor" dangerouslySetInnerHTML={{ __html: html }} />
      {isProduction && <Utterances repo="wicksome/blog" />}
    </Layout>
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
      pageAttributes {
        toc
      }
    }
  }
`
