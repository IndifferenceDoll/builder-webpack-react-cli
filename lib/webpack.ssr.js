const cssnano = require('cssnano');
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.base');

const ssrConfig = {
  output: {
    filename: '[name]-server.js',
    libraryTarget: 'umd',
  },
  mode: 'production',
  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/,
  //       use: 'ignore-loader',
  //     },
  //     {
  //       test: /\.less$/,
  //       use: 'ignore-loader',
  //     },
  //   ],
  // },
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-server.css',
    }),
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
        // vendors: {
        //   test: /(react|react-dom)/,
        //   name: 'vendors',
        //   chunks: 'all',
        // },
      },
    },
  },
  stats: 'errors-only',
};

module.exports = merge(baseConfig, ssrConfig);
