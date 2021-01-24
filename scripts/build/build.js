const folderActions = require('./folder-actions')
const assets = require('./assets')
const minify = require('./minify')
const templates = require('./templates')

const { COMPILED_SUCCESSFULLY, GENERAL_ERR } = require('../helper/messages')

function build () {
  folderActions.removeDistFolder()
  folderActions.createDistFolder()

  Promise.all([
    assets.copy('fonts'),
    assets.copy('img')
      .then(assets.compileWebp),
    minify.js(),
    minify.css(),
    templates.compile()
  ])
    .then(() => console.log(COMPILED_SUCCESSFULLY))
    .catch((err) => console.error(GENERAL_ERR(err)))
}

module.exports = build
