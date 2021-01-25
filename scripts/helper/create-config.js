const fs = require('fs')

const { CONFIG_CREATED, CONFIG_NOT_CREATED } = require('./messages')

const _CONFIG = `
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
  customTemplateVariables: {}
}
`

function createConfig () {
  try {
    if (fs.readFileSync('modularize-html-config.js')) {
      console.log(CONFIG_NOT_CREATED)
      return
    }
  } catch (err) {
    fs.writeFileSync('modularize-html-config.js', _CONFIG)
    console.log(CONFIG_CREATED)
  }
}

module.exports = createConfig
