module.exports = {
  reactStrictMode: true,
  devIndicators: {
    autoPrerender: false,
  },
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.(eot|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]',
          },
        },
      }
    );

    return config;
  },
};
