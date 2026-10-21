module.exports = {
  // publicPath: process.env.NODE_ENV === "production" ? "/a20261020hthium/" : "./",
  publicPath: "./",
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