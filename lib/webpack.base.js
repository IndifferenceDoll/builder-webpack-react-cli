const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const glob = require('glob');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const postCss = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [
      autoprefixer({
        overrideBrowserslist: ['last 2 versions', '>1%', 'ios 7'],
      }),
    ],
  },
};
const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true, // 此配置用来打开利于css调试的sourcemap
    modules: {
      // 此配置用来开启样式模块化，为true时启用，false时关闭，未设置localIdentName时样式名为无规则乱码
      // localIdentName，此配置在3.2.0之前与modules平级，3.2.0之后，
      // modules可为对象(为对象时，默认开启模块化)，配置与其中
      localIdentName: '[path][name]__[local]--[hash:base64:5]',
    },
  },
};

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  // 获取npm命令的参数，并转为对象
  const argsStr = process.env.npm_config_argv;
  let argsObj = {};
  try {
    argsObj = JSON.parse(argsStr);
  } catch (err) {
    console.log(err);
  }

  // 将其中包含参数键值对的数组解构出来，并生成真正的参数对象
  const { original = [] } = argsObj;
  const itIsSSR = original.includes('ssr');

  // process.cwd()表示执行命令的文件夹，__dirname表示文件所处文件夹
  let entryFiles = glob.sync(path.join(process.cwd(), `./src/multipart/*/index${itIsSSR ? '-server' : ''}.js`));
  // 这里获取的是一个数组，每一个元素都是/src/multipart/文件夹下的一个页面的地址 =》多页面

  const itIsMulpart = !!entryFiles.length;

  if (!itIsMulpart) {
    entryFiles = glob.sync(path.join(process.cwd(), `./src/index${itIsSSR ? '-server' : ''}.js`));
    // 这里获取的是一个数组，只有一个元素，是/src/下的一个index页面的地址 =》单页面
  }
  Object.keys(entryFiles) // 目前entryFiles是一个数组，所以直接map也可以，这里是为了更通用，也兼容了其为obj的情况。
    .forEach((index) => {
      const entryFile = entryFiles[index]; // 取出每一串地址
      const reg = itIsSSR ? /src\/multipart\/(.*)\/index-server\.js/ : /src\/multipart\/(.*)\/index\.js/;
      const matchRes = entryFile.match(reg); // 匹配出每一串地址中的  index  和  other  等字符。 =》多页面
      let pageName = matchRes && matchRes[1]; // 获取每个页面名字
      pageName = pageName || 'index';
      entry[pageName] = entryFile; // 设置entry
      const newPlugin = new HtmlWebpackPlugin({
        inlineSource: '.css$',
        template: path.join(process.cwd(), `src/${!itIsMulpart ? '' : `multipart/${pageName}/`}index.html`),
        filename: `${itIsMulpart ? pageName : 'index'}.html`,
        chunks: [pageName, 'vendors-server', 'commons'],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      });
      htmlWebpackPlugins.push(newPlugin);
    });

  return {
    entry,
    htmlWebpackPlugins,
  };
};
const { entry, htmlWebpackPlugins } = setMPA();

const catchError = function catchError() {
  this.hooks.done.tap('done', (stats) => {
    if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
      console.log('build error'); //eslint-disable-line
      console.log('stats.compilation.errors', stats.compilation.errors);
      console.log('process.argv', process.argv); //eslint-disable-line

      process.exit(1);
    }
  });
};

module.exports = {
  entry,
  output: {
    path: path.join(process.cwd(), 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          cssLoader,
          postCss,
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // 1rem等于75px
              remPrecision: 8, // px转换为rem后，保留8位小数点
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          cssLoader,
          postCss,
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // 1rem等于75px
              remPrecision: 8, // px转换为rem后，保留8位小数点
            },
          },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|otf|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    catchError].concat(htmlWebpackPlugins),
};
