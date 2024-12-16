import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'CANSY Documentations',
  tagline: 'Code Automations and Notion Systems for Gamifying Life',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://bsamaritan.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Bayesian Labs', // Usually your GitHub org/user name.
  projectName: 'code automation & notion systems', // Usually your repo name.

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
      {
        docs: {
          sidebarPath: './sidebars.ts',
          showLastUpdateTime: true,
          
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/anoopkarnik/code-automations-notion-systems/tree/main/apps/docs',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/anoopkarnik/code-automations-notion-systems/tree/main/apps/docs/blog/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Code Automation & Notion Systems',
      logo: {
        alt: 'CAS',
        src: 'img/logo.png',
        srcDark: 'img/logo-dark.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/blog',
          label: 'Blog', 
          position: 'left'
        },
        {
          href: 'https://bsamaritan.com/',
          position: 'right',
          label: 'Platform',
        },
        {
          href: 'https://github.com/anoopkarnik/code-automations-notion-systems',
          'aria-label': 'Github repository',
          className: 'header-github-link',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: '/docs/overview',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Privacy Policy',
              href: 'https://www.termsfeed.com/live/f7faf120-c351-422d-bd3a-cb7a2c931284'
            },
            {
              label: 'Terms of Service',
              href: 'https://www.termsofusegenerator.net/live.php?token=saSU4fpQYzVVm0jLgtV88ty1x4tEHMA7'
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Linkedin',
              href: 'https://www.linkedin.com/company/bayesian-labs1',
            }, 
          ],
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Code Automations & Notion Systems, Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
