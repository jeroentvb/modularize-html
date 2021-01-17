const fs = require('fs-extra')


function copyAssets (type) {
  fs.copy(`./src/assets/${type}`, `./dist/assets/${type}`, err => {
    if (err) {
      console.error(`${type} could not be copied because of the following error: ${err}`)
    } else {
      console.log(`Succesfully copied ${type}`)
    }
  })
}

module.exports = {
  copyAssets
}
