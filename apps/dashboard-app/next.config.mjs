/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@repo/ui","@repo/next-auth","@repo/prisma-db"],
    images:{
        domains: ['yt.ggpht.com','yt3.ggpht.com','i.ytimg.com']
    }
};

export default nextConfig;
