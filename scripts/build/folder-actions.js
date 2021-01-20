const fs = require('fs-extra')

const messages = require('./messages')

function removeDistFolder () {
  if (fs.existsSync('./dist')) {
    fs.removeSync('./dist')
  }
}

function createDistFolder () {
  if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist')
    console.log(messages.CREATED_DIST)
  }
  if (!fs.existsSync('./dist/assets')) {
    fs.mkdirSync('./dist/assets')
    console.log(messages.CREATED_ASSETS)
  }
}

module.exports = {
  removeDistFolder,
  createDistFolder
}
