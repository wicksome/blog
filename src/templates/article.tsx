import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

export default ({ data }) => {
  return (
    <Layout tocLeft={data.asciidoc.pageAttributes.tocleft !== null}>
      <div dangerouslySetInnerHTML={{ __html: data.asciidoc.html }} />
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
        tocleft
      }
    }
  }
`
