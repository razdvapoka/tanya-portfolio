module.exports = {
  presets: [
    'next/babel'
  ],
  plugins: [
    [ 'emotion', { 'inline': true } ],
    [ 'inline-import', { 'extensions': [ '.css' ] } ]
  ]
}
