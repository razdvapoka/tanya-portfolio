const isDev = process.env.NODE_ENV !== 'production'
const isCI = Boolean(process.env.CI)
const isProd = !isDev
const isClient = typeof window !== 'undefined'
const isServer = !isClient

module.exports = {
  isClient,
  isServer,
  isCI,
  isDev,
  isProd,
  public: isClient ? (window._config || {}) : {}
}
