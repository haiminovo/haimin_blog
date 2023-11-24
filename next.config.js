/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'haiminovo.cn',
                pathname: '**',
            },
        ],
    },
};

module.exports = nextConfig;
