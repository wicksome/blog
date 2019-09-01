import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

export default ({ data }) => {
  return (
    <Layout>
      <h1>{data.asciidoc.document.title} </h1>
      {data.asciidoc.revision && (
        <table>
          <thead>
            <tr>
              <td colSpan="2">Revision metadata</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>revision.date</th>
              <td>{data.asciidoc.revision.date}</td>
            </tr>
            <tr>
              <th>revision.number</th>
              <td>{data.asciidoc.revision.number}</td>
            </tr>
          </tbody>
        </table>
      )}
      <div
        dangerouslySetInnerHTML={{ __html: data.asciidoc.html }}
      />
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
    }
  }
`
