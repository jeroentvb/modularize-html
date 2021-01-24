const fs = require('fs-extra')

const { CREATED_DIST, CREATED_ASSETS } = require('../helper/messages')
const { DIST_FOLDER, ASSETS_FOLDER } = require('../helper/paths')

function removeDistFolder () {
  if (fs.existsSync(DIST_FOLDER)) {
    fs.removeSync(DIST_FOLDER)
  }
}

function createDistFolder () {
  if (!fs.existsSync(DIST_FOLDER)) {
    fs.mkdirSync(DIST_FOLDER)
    console.log(CREATED_DIST)
  }

  if (!fs.existsSync(ASSETS_FOLDER)) {
    fs.mkdirSync(ASSETS_FOLDER)
    console.log(CREATED_ASSETS)
  }
}

module.exports = {
  removeDistFolder,
  createDistFolder
}
