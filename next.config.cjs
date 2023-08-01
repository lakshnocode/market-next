module.exports = {
    webpack: (config, { isServer }) => {
      // For font files
      if (!isServer) {
        config.module.rules.push({
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: {
            loader: 'url-loader',
          },
        });
      }
      return config;
    },
  };
  