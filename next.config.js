module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'posteveryday.s3.ca-central-1.amazonaws.com',
                port: '',
                pathname: '/*/**',
            },
            {
                protocol: 'https',
                hostname: 'posteveryday.s3.amazonaws.com',
                port: '',
                pathname: '/*/**',
            },
        ],
    },
};
