const webpack = require('webpack')
const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT

module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }
    config.plugins.push(new webpack.DefinePlugin({
      IS_CLIENT: !isServer
    }))
    return config
  },
  publicRuntimeConfig: {
    isDev,
    isProd: !isDev,
    siteUrl: isDev
      ? 'http://localhost:' + port
      : 'https://tanya-ermolaeva.now.sh'
  }
}
