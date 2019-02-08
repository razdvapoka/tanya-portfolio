const sharedConfig = require('./universal')

const config = {
  siteUrl: sharedConfig.isDev ? 'http://localhost:62126' : 'https://tanya-ermolaeva.now.sh'
}

module.exports = Object.assign({}, sharedConfig, config)
