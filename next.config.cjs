module.exports = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.module.rules.push({
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['next/babel'],
            },
          },
        });
      }
  
      return config;
    },
  };
  