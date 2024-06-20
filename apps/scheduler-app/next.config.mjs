/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@repo/ui","@repo/next-auth","@repo/prisma-db","@repo/notion"]
};

export default nextConfig;
