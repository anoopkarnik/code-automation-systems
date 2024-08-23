import nextra from "nextra";
import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@repo/ui","@repo/next-auth","@repo/prisma-db","@repo/notion","@repo/winston-logger",
        "@repo/zod"
    ],
    images:{
        remotePatterns: [
            {hostname: 'yt.ggpht.com', protocol:'https'},
            {hostname: 'yt3.ggpht.com', protocol:'https'},
            {hostname: 'i.ytimg.com', protocol:'https'}
        ]
    }
};

const withNextra = nextra({
    theme: "nextra-theme-docs",
    themeConfig: "./theme.config.jsx",
})

export default withNextra(nextConfig);
