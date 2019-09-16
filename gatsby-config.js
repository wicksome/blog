/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Documents`,
    links: {
      linkedin: "https://www.linkedin.com/in/yeongjun/",
      github: "https://github.com/wicksome",
    },
  },
  /* Your site config here */
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/posts`,
        ignore: [`**/\.*`, `**/README.adoc`],
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: `gatsby-transformer-asciidoc`,
      options: {
        header_footer: true,
        attributes: {
          icons: `font`,
          "source-highlighter": `highlightjs`,
          imagesdir: `/images`,
        },
      },
    },
    `gatsby-plugin-emotion`,
    // gatsby-plugin-offline
    "gatsby-plugin-sass",
    // gatsby-plugin-google-analytics
  ],
}
