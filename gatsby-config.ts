import type { GatsbyConfig } from "gatsby";
import { config as configDotenv } from 'dotenv'
import { languages, defaultLanguage } from './languages';

configDotenv({
  path: `.env.${process.env.NODE_ENV}`,
})

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: [
    {
      singularName: 'artist',
      pluginOptions: {
        i18n: {
          locale: 'all'
        }
      }
    },
    {
      singularName: 'news',
      pluginOptions: {
        i18n: {
          locale: 'all'
        }
      }
    },
    {
      singularName: 'program',
      pluginOptions: {
        i18n: {
          locale: 'all'
        }
      }
    },
  ],
  singleTypes: ['common', 
    {
      singularName: 'index',
      queryParams: {
        populate: {
          Hero: "*",
          Logo: "*",
          Sponsors: {
            populate: "*"
          }
        }
      }
    }
  ]
};


const config: GatsbyConfig = {
  siteMetadata: {
    title: `Veszprém Blues Fesztivál`,
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-image", 
    "gatsby-plugin-sitemap",
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/assets/VBF_logo.svg"
      }
    }, 
    "gatsby-plugin-mdx", 
    "gatsby-plugin-sharp", 
    "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "assets",
        "path": "./src/assets/"
      },
      __key: "assets"
    },
    {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
    },
    "gatsby-plugin-dts-css-modules",
    {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // Footnotes mode (default: true)
        footnotes: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`
      }
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        languages,
        defaultLanguage,
        siteUrl: 'https://www.yourdomain.tld',
        i18nextOptions: {
          // debug: true,
          fallbackLng: defaultLanguage,
          supportedLngs: languages,
          defaultNS: 'common',
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          }
        },
      },
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: "1483340128818505",
      },
    },
  ]
};

export default config;
