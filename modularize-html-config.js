module.exports = {
  build: {
    minify: {
      js: true,
      css: true
    },
    encodeImagesWebp: true,
    pageTitle: {
      home: 'Home',
      suffix: ''
    }
  },
  development: {
    removeWebpSources: true,
    staticSite: true
  },
  customTemplateVariables: {},
  sass: false
}
