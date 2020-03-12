if (typeof window === 'undefined') {
  global.window = {};
}

const fs = require('fs');
const path = require('path');
const express = require('express');
const { renderToString } = require('react-dom/server');
const SSR = require('../dist/other-server');
const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8'); //由于读到的是一个二进制的buffer文件，所以需要usf-8转码一下。
const data = require('../src/assets/data.json');

const renderMarkup = (str) => {
  const dataStr = JSON.stringify(data);
  return template.replace('<!--HTML_PLACEHOLDER-->', str).replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>window.__initial_data = ${dataStr}</script>`);
};

const server = (port) => {
  const app = express();

  app.use(express.static('dist'));

  app.get('/other', (req, res) => {
    const str = renderToString(SSR);
    const html = renderMarkup(str);
    res.status(200).send(html);
  });

  app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
  });
};

server(process.env.PORT || 9090);
