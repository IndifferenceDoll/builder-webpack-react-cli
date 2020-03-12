const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.base');

const devConfig = {
  output: {
    filename: '[name]_chunkhash.js',
  },
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_contenthash.css',
    }),
  ],
  devServer: {
    openPage: 'index.html', // 配置第一次打开的页面
    contentBase: path.join(process.cwd(), './dist'),
    hot: true,
    compress: true,
    port: 9999,
    disableHostCheck: true,
    stats: 'errors-only',
  },
  devtool: 'cheap-source-map',
};

module.exports = merge(baseConfig, devConfig);
