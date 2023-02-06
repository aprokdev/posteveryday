module.exports = {
    // async redirects() {
    //     return [
    //         {
    //             source: '/',
    //             destination: '/login',
    //             permanent: true,
    //         },
    //     ];
    // },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'posteveryday.s3.ca-central-1.amazonaws.com',
                port: '',
                pathname: '/images/**',
            },
        ],
    },
};
