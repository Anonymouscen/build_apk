module.exports = {
  // publicPath: process.env.NODE_ENV === "production" ? "/a20250924car/" : "./",
  publicPath: "./",

  // 修改或新增html-webpack-plugin的值，在index.html里面能读取htmlWebpackPlugin.options.title
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "";
      return args;
    })
  },
  devServer: {
    proxy: {
      "/bimfaceApi": {
        target: "https://api.bimface.com/",
        changeOrigin: true,
        pathRewrite: {
          '^/bimfaceApi': '' //路径转发代理
        }
      },
    }
  }
};