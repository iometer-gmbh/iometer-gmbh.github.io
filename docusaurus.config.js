// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'IOmeter',
  tagline: 'Mach mehr aus deinem Strom.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://iometer-gmbh.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs/',

  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'iometer-gmbh/', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          id: 'iometer',
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  plugins: [
    // [
    //   '@docusaurus/plugin-content-pages',
    //   {
    //     id: 'whitelist',
    //     path: 'docs-whitelist',
    //     routeBasePath: 'docs-whitelist',
    //   },
    // ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'local-api',
        path: 'docs-local-api',
        routeBasePath: 'docs-local-api',
        sidebarPath: require.resolve('./sidebarsLocal.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'provider-api',
        path: 'docs-provider-api',
        routeBasePath: 'docs-provider-api',
        sidebarPath: require.resolve('./sidebarsProvider.js'),
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'IOmeter Dokumenation',
        logo: {
          alt: 'IOmeter Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            label: 'IOmeter',
            to: '/docs/welcome',
            position: 'left',
            docsPluginId: 'iometer',
          },
          // {
          //   label: 'Whitelist',
          //   to: '/docs-whitelist/whitelist',
          //   position: 'left',
          //   docsPluginId: 'whitelist',
          // },
          {
            label: 'Lokale API',
            to: '/docs-local-api/api',
            position: 'left',
            docsPluginId: 'local-api',
          },
          {
            label: 'Provider API',
            to: '/docs-provider-api/api',
            position: 'left',
            docsPluginId: 'provider-api',
          },
          {
            href: 'https://iometer.zendesk.com/hc/de/requests/new',
            label: 'Support',
            position: 'right',
          },
          {
            href: 'https://github.com/iometer-gmbh',
            // label: 'GitHub',
            position: 'right',
            className: 'header-github-link',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Dokumentation',
            items: [
              // {
              //   label: 'Whitelist',
              //   to: '/docs-whitelist/whitelist',
              // },
              {
                label: 'Lokale API',
                to: '/docs-local-api/api',
              },
              {
                label: 'Provider API',
                to: '/docs-provider-api/api',
              },
            ],
          },
          {
            title: 'Mehr IOmeter',
            items: [
              {
                label: 'Webseite',
                href: 'https://iometer.de',
              },
              {
                label: 'Shop',
                href: 'https://shop.iometer.de',
              },
            ],
          },
          {
            title: 'Entwickler',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/iometer-gmbh',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} IOmeter GmbH. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
