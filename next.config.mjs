/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.glb$/,
      use: [
        {
          loader: 'url-loader',
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
