/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const WEB_NAME = "Documents"

module.exports = {
  siteMetadata: {
    title: WEB_NAME,
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
    `gatsby-plugin-sass`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Wicksome Documents`,
        short_name: `Wicksome Docs`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-43444044-3",
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
  ],
}
