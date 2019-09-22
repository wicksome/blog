import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface Props {
  title?: string
  description?: string
  image?: string
  pathname?: string
  article?: boolean
}

const defaultProps: Props = {
  title: null,
  description: null,
  image: null,
  pathname: null,
  article: false,
}

const SEO: React.SFC<Props> = ({
  title,
  description,
  image,
  pathname,
  article,
}) => {
  const {
    site: {
      siteMetadata: { defaultTitle, defaultDescription, siteUrl, defaultImage },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            siteUrl: url
            defaultImage: image
          }
        }
      }
    `
  )

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname || "/"}`,
  }
  return (
    <Helmet title={seo.title}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {!!article && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}
    </Helmet>
  )
}
SEO.defaultProps = defaultProps

export default SEO
