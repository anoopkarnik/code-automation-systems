import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();


/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@repo/ui","@repo/next-auth","@repo/prisma-db","@repo/notion","@repo/winston-logger",
        "@repo/zod"
    ],
    reactStrictMode: true,
    images:{
        remotePatterns: [
            {hostname: 'yt.ggpht.com', protocol:'https'},
            {hostname: 'yt3.ggpht.com', protocol:'https'},
            {hostname: 'i.ytimg.com', protocol:'https'},
            {hostname: 'localhost', protocol:'http'},
        ]
    }
};

// const withNextraDocs = nextra({
//     theme: 'nextra-theme-docs',
//     themeConfig: './theme-docs.config.jsx'
// });

const combinedConfig = withMDX(nextConfig);

export default combinedConfig;