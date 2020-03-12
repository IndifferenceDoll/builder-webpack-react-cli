### 客户端渲染

#### 单页面

src 下，入口文件为 index.js 文件。同 multipart 文件互斥,且优先 multipart 文件夹(即只要 multipart 文件夹里有页面，就忽略 index.js 并走多页面打包)。

#### 多页面

src 下，入口文件为 multipart/\*/index.js 文件。同 index.js 文件互斥,且优先 multipart 文件夹(即只要 multipart 文件夹里有页面，就忽略 index.js 并走多页面打包)。
多页面时，每个文件夹中需要一个 index.html,若想统一使用一个，请修改 webpack.base.js 中的 new HtmlWebpackPlugin，将 template: path.join(process.cwd(), `src/${!itIsMulpart ? '' :`\${pageName}/`}index.html`)修改为 template: path.join(process.cwd(), `src/index.html`),

### 服务端渲染

#### 单页面

src 下，入口文件为 index-server.js 文件。同 multipart 文件互斥,且优先 multipart 文件夹(即只要 multipart 文件夹里有页面，就忽略 index-server.js 并走多页面打包)。

#### 多页面

src 下，入口文件为 multipart/\*/index-server.js 文件。同 index.js 文件互斥,且优先 multipart 文件夹(即只要 multipart 文件夹里有页面，就忽略 index-server.js 并走多页面打包)。
多页面时，每个文件夹中需要一个 index.html,若想统一使用一个，请修改 webpack.base.js 中的 new HtmlWebpackPlugin，将 template: path.join(process.cwd(), `src/${!itIsMulpart ? '' :`\${pageName}/`}index.html`)修改为 template: path.join(process.cwd(), `src/index.html`),
