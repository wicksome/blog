/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
module.exports = {
  siteMetadata: {
    title: `Documents`,
    description: "",
    url: "https://wickso.me",
    image: "/images/snape.jpg",
    social: {
      linkedin: "yeongjun",
      github: "wicksome",
      twitter: "wicksome",
    },
  },
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
        isTSX: true, // default: false
        jsxPragma: `jsx`, // default: "React"
        allExtensions: true, // default: false
      },
    },
    {
      resolve: `gatsby-transformer-asciidoc`,
      options: {
        base_dir: `${__dirname}/posts`,
        header_footer: true,
        attributes: {
          icons: `font`,
          stylesdir: `/css`,
          imagesdir: `/images`,
          nofooter: true,
          tabsize: 2,
          "source-highlighter": `highlightjs`,
        },
      },
    },
    "gatsby-plugin-sass",
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    // gatsby-plugin-offline
    // gatsby-plugin-google-analytics
  ],
}
