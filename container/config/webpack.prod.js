const { merge } = require('webpack-merge');
const ModulesFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const commonConfig = require('./webpack.common');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',

    // this is the path of your bucket in aws like this:
    // https://f42309sf90sdf.couldfront.net/container/latest/main.foisdf8972354.js
    // this path '/container/latest/' will define in your aws bucket by yourself

    publicPath: '/container/latest/',
  },
  plugins: [
    new ModulesFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketing@${process.env.PRODUCTION_DOMAIN}/marketing/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
