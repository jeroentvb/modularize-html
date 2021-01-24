const fs = require('fs')

const _CONFIG = {
  "build": {
    "minify": {
      "js": true,
      "css": true
    },
    "encodeImagesWebp": true,
    "pageTitle": {
      "home": "Home",
      "suffix": ""
    }
  },
  "development": {
    "removeWebpSources": true,
    "staticSite": true
  }
}

function createConfig () {
  fs.writeFileSync('modularize-html-config.json', JSON.stringify(_CONFIG, null, 2))
}

module.exports = createConfig
