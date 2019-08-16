const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass');
// const withLess = require('@zeit/next-less');//需要使用less不实用scss的大佬,把withSass替换成withSass即可,如果都需要就都引入
const withTypescript = require('@zeit/next-typescript');//引入typescript,让next解析
const withPlugins = require("next-compose-plugins/lib");//结合sass css

module.exports = withPlugins([withSass,withCss,withTypescript],{
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]
      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });
    }
    return config
  },
})