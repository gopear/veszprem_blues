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
    }
  ],
  singleTypes: ['common', 'ticket', 'summary',
    {
      singularName: 'index',
      pluginOptions: {
        i18n: {
          locale: 'all'
        }
      },
      queryParams: {
        populate: {
          Hero: "*",
          Logo: "*",
          Sponsors: {
            populate: "*"
          },
          Artists: {
            populate: "*"
          }
        }
      }
    },
    {
      singularName: 'programme',
      queryParams: {
        populate: {
          Artists: {
            populate: "*"
          }
        }
      }
    },
    {
      singularName: 'venue',
      pluginOptions: {
        i18n: {
          locale: 'all'
        }
      }
    },
    {
      singularName: 'footer',
      queryParams: {
        populate: {
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
    siteUrl: `https://veszpremblues.hu`
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
        "name": "hu",
        "path": "./src/assets_loc/hu/"
      },
      __key: "hu"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "en",
        "path": "./src/assets_loc/en/"
      },
      __key: "en"
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
        plugins: [`gatsby-remark-smartypants`],
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
        siteUrl: 'https://veszpremblues.hu',
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
        pixelId: "865949118057852",
      },
    },
  ]
};

export default config;
