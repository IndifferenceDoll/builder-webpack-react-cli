if (typeof window === 'undefined') {
  global.window = {};
}

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const express = require('express');
const { renderToString } = require('react-dom/server');

const entryFiles = glob.sync(path.join(process.cwd(), './dist/*-server.js'));
const templateFiles = glob.sync(path.join(process.cwd(), './dist/*.html'));

const data = require('../src/assets/data.json'); //！！！这是一个mock的json的数据！！！

const getServerFile = (SSR) => require(SSR);

const renderMarkup = (str, location) => {
  const dataStr = JSON.stringify(data);
  const SSR = templateFiles.filter((addr) => addr.indexOf(location))[0];
  const template = fs.readFileSync(SSR, 'utf-8'); //由于读到的是一个二进制的buffer文件，所以需要usf-8转码一下。
  return template.replace('<!--HTML_PLACEHOLDER-->', str).replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>window.__initial_data = ${dataStr}</script>`);
};

const server = (port) => {
  const app = express();

  app.use(express.static('dist'));

  entryFiles.forEach((addr) => {
    const reg = /dist\/(.*)-server\.js/;
    const matchRes = addr.match(reg); // 匹配出每一串地址中的  index  和  other  等字符。 =》多页面
    const location = matchRes && matchRes[1]; // 获取每个页面名字
    const SSR = getServerFile(addr);
    app.get(`/${location}`, (req, res) => {
      const str = renderToString(SSR);
      const html = renderMarkup(str, location);
      res.status(200).send(html);
    });
  });

  app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
  });
};

server(process.env.PORT || 9090);

//读取文件夹，自动生成多个ssr
//run ssr时只删除ssr的东西，run build时，只删除build的东西。
