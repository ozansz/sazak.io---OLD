// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteUrl: 'https://sazak.io',
  siteName: 'Ozan Sazak',
  siteDescription: 'Passionate developer and CS student at METU. Writing my thoughts and experiences about GNU/Linux, fullstack development, DevOps and so on.',

  titleTemplate: '%s # sazak.io',

  plugins: [
    {
      // Create posts from markdown files
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Post',
        path: 'content/posts/*.md',
        route: '/articles/:year/:month/:day/:slug',
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: 'Tag',
            route: '/tags/:id',
            create: true
          }
        }
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-144697835-1'
      }
    }
  ],

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        '@gridsome/remark-prismjs'
      ]
    }
  },
}