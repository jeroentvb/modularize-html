const fs = require('fs-extra')

function removeDistFolder () {
  if (fs.existsSync('./dist')) {
    fs.removeSync('./dist')
  }
}

function createDistFolder () {
  if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist')
    console.log('Created /dist folder')
  }
  if (!fs.existsSync('./dist/assets')) {
    fs.mkdirSync('./dist/assets')
    console.log('Created /dist/assets folder')
  }
}

module.exports = {
  removeDistFolder,
  createDistFolder
}
