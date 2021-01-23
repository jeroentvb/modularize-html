const fs = require('fs')

const CONFIG = {
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
  fs.writeFileSync('modular-html-config.json', JSON.stringify(CONFIG, null, 2))
}

module.exports = createConfig
