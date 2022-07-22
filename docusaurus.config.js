const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Code for GovTech projects",
  tagline: "Updates about activites done by Code for GovTech students.",
  url: "http://tech.samagragovernance.in/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "Samagra",
  projectName: "c4gt",
  themeConfig: {
    navbar: {
      title: "Home",
      logo: {
        alt: "Home",
        src: "img/logo.png",
      },
      items: [
        {
          label: "2022",
          position: "left",
          to: "/docs/2022/",
          items: [
            {
              label: "UCI Web Channel",
              to: "/docs/2022/uci/",
            },
            
            {
              label: "Competency Passbook",
              to: "/docs/2022/passbook/",
            },
            {
              label: "Admin for Sunbird RC",
              to: "/docs/2022/admin/",
            },
            {
              label: "Centralized Access Control",
              to: "/docs/2022/cac/",
            },
            {
              label: 'Yaus: Yet Another URL Shortener',
              to: '/docs/2022/yaus/',
            },
            {
              label: 'Shiksha',
              to: '/docs/2022/shiksha/',
            }, 
            {
              label: 'Sunbird QuML Player',
              to: '/docs/2022/sunbird-quml/',
            },
            {
              label: 'Machine Learning Platform',
              to: '/docs/2022/ml-platform/',
            },
          ],
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Community",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/Code4GovTech",
            },
            {
              label: "Discord",
              href: "https://discord.gg/XeNVhYV4",
            },
            {
              label: "Main home page",
              href: "http://tech.samagragovernance.in/",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "YouTube",
              href: "https://www.youtube.com/channel/UCfkXErS-f87xUQkmSKSC8bg",
            },
            {
              label: "Getting started",
              href: "https://github.com/Code4GovTech/C4GT/wiki",
            },
          ],
        },
      ],
      copyright: `Copyright © 2022 C4GT, Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/Code4GovTech/C4GT/edit/main/",
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/Code4GovTech/C4GT/edit/main/",
        },
        theme: {
          customCss: [require.resolve("./src/css/custom.css")],
        },
      },
    ],
  ],
};
