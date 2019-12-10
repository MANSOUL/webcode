module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-px-to-viewport')({
      unitToConvert: 'px',
      viewportWidth: 375,
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      propList: ['*']
    })
  ]
}
