const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssNano = require('cssnano');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.base');

const prodConfing = {
  output: {
    filename: '[name]_[chunkhash:8].js',
  },
  mode: 'production',
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessor: CssNano,
    }),
    new HtmlWebpackTagsPlugin({
      // 替代HtmlWebpackExternalsPlugin插件，效果雷同
      scripts: [
        {
          path: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
          external: {
            packageName: 'react',
            variableName: 'React',
          },
        },
        {
          path: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
          external: {
            packageName: 'react-dom',
            variableName: 'ReactDOM',
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
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
        // commons: {
        //   test: /(react|react-dom)/,
        //   name: 'vendors',
        //   chunks: 'all',
        // },
      },
    },
  },
  stats: 'errors-only',
};

module.exports = merge(baseConfig, prodConfing);
